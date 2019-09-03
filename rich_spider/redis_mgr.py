# !/usr/bin/env python
# encoding: utf-8  
"""
Created by sunyh on 2019/9/3
Description:
"""
import redis
from redis import WatchError


class RedisManager(object):
    def __init__(self, url, db):
        # self.redis_client = redis.StrictRedis(host=host, port=port, db=db)
        # pool = redis.ConnectionPool(host=host, port=port, db=db)
        pool = redis.ConnectionPool.from_url(url=url, db=db)
        self.redis_client = redis.Redis(connection_pool=pool)

    def pop_msg(self, key):
        fetch_data = self.redis_client.lpop(key)
        return fetch_data

    def pop_msgs(self, key, pop_len):
        with self.redis_client.pipeline() as pipe:
            try:
                pipe.watch(key)
                pipe.multi()
                pipe.lrange(key, 0, pop_len)
                pipe.ltrim(key, pop_len + 1, -1)
                packed = pipe.execute()[0]
            except WatchError as e:
                print('''
                pop_msgs error
                %s
                ''' % e)
                pipe.unwatch()
                return None
            else:
                return packed
        pass

    def push_msg(self, key, msg):
        p_res = self.redis_client.rpush(key, msg)
        return p_res

    def push_msgs(self, redis_key, msgs: list):
        try:
            with self.redis_client.pipeline(transaction=False) as pipe:
                for msg in msgs:
                    pipe.rpush(redis_key, msg)
                pipe.execute()
        except Exception as exec:
            print(exec)
        else:
            print('push msgs success')
    pass


REDIS_CLS = None


def redis_cls():
    global REDIS_CLS
    if REDIS_CLS is None:
        REDIS_CLS = RedisManager('redis://@192.168.1.104:6379', 0)
    return REDIS_CLS


if __name__ == "__main__":
    key = 'rich_jd_cate'
    # print(redis_cls().redis_client.info())
    # print(redis_cls().redis_client.keys())
    # print(redis_cls().pop_msg(key).decode('utf-8'))
    # print(redis_cls().redis_client.delete(key))
    print(redis_cls().redis_client.llen(key))
    # print(redis_cls().pop_msgs(key, 3))