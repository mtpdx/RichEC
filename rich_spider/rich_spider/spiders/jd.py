# -*- coding: utf-8 -*-
import scrapy
import logging
import copy
import json
from scrapy import Request
from scrapy_redis.spiders import RedisSpider


class JdSpider(RedisSpider):
    name = 'jd'
    # allowed_domains = ['jd.com']
    # start_urls = ['http://sunyh.com#1316_16831_16838']
    redis_key = 'rich_jd_cate'
    jd_url = 'https://union.jd.com/api/goods/search'

    @staticmethod
    def __trans_data(page, cat_list):
        post_data = {}
        post_data['pageNo'] = page
        post_data['pageSize'] = '60'
        post_data['searchUUID'] = "9c877c8e8d944e4fbf9f304edc9f8180"
        data = {}
        data['categoryId'] = cat_list[0]
        data['cat2Id'] = cat_list[1]
        data['cat3Id'] = cat_list[2]
        data['deliveryType'] = '0'
        data['hasCoupon'] = '0'
        data['isCare'] = '0'
        data['isPinGou'] = '0'
        data['isZY'] = '0'
        data['key'] = ''
        data['keywordType'] = 'kt0'
        data['lock'] = '0'
        data['orientationFlag'] = '0'
        data['searchType'] = 'st3'
        data['sort'] = 'desc'
        data['sortName'] = 'inOrderCount30Days'
        post_data['data'] = data
        return post_data
        pass

    @staticmethod
    def __jd_headers(page, cat_list):
        return {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en',
            'authority': 'union.jd.com',
            'path': '/api/goods/search',
            'method': 'POST',
            'origin': 'https://union.jd.com',
            'Content-Type': 'application/json;charset=UTF-8',
            'Referer': 'https://union.jd.com/proManager/index?categories=%s&pageNo=%s' % (','.join(cat_list), page),
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'

        }
        pass

    def parse(self, response):
        logging.warning(response.url)
        cats = response.text.split('_')
        turn = {
            'cat': response.text
        }
        yield Request(url=self.jd_url, meta={'turn': copy.deepcopy(turn)}, method='POST',
                      body=json.dumps(self.__trans_data(1, cats)),
                      headers=self.__jd_headers(1, cats),
                      callback=self.parse_union, dont_filter=True, encoding='utf-8')
        pass

    def parse_union(self, response):
        logging.warning(response.url)
        turn = response.meta.get('turn', {})
        cats = turn['cat'].split('_') if turn else []
        resp = json.loads(response.text)
        if resp['code'] == 200 and resp['data']['unionGoods']:
            ugs = resp['data']['unionGoods']
            if ugs and cats:
                yield {'d': ugs, 'c': cats}
        pass
