# !/usr/bin/env python
# encoding: utf-8  
"""
Created by sunyh on 2019/9/3
Description:
"""
import schedule
import time
import logging
import csv
from redis_mgr import redis_cls


def jd_cats_sender(cat_key):
    try:
        with redis_cls().redis_client.pipeline(transaction=False) as pipe:
            with open('jd_cats_from_jos_new.csv', 'r', encoding='utf-8') as read_file:
                lines = csv.reader(read_file)
                for line in lines:
                    if line[3] == '2':
                        pipe.rpush(cat_key, 'http://sunyh.com#%s' % line[0])
            pipe.execute()
    except Exception as exec:
        logging.error('''sender error:%s
        time: %s
        ''' % (exec, time.strftime('%Y-%m-%d %H:%M:%S')))
    else:
        logging.info('''sender success:
        time: %s
        ''' % time.strftime('%Y-%m-%d %H:%M:%S'))


if __name__ == '__main__':
    logging.getLogger().setLevel(logging.INFO)
    schedule.every(6).hours.do(jd_cats_sender, 'rich_jd_cate')
    jd_cats_sender('rich_jd_cate')
    while True:
        schedule.run_pending()
        time.sleep(1)