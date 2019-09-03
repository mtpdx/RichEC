# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

from sqlalchemy import Column, create_engine, BIGINT, VARCHAR, INT, DATETIME, BINARY, FLOAT, TEXT, DECIMAL
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import time

Base = declarative_base()


class RichGoods(Base):
    __tablename__ = 'RICH_GOODS'
    id = Column(VARCHAR, primary_key=True)
    plateform = Column(VARCHAR, nullable=True)
    title = Column(VARCHAR, nullable=True)
    create_by = Column(VARCHAR, default='system')
    creation_date = Column(DATETIME, nullable=True)
    last_updated_by = Column(VARCHAR, default='system')
    last_updated_date = Column(DATETIME, nullable=True)
    price = Column(VARCHAR, nullable=True)
    price_val = Column(FLOAT, nullable=True)
    now_price = Column(VARCHAR, nullable=True)
    now_price_val = Column(FLOAT, nullable=True)
    item_id = Column(VARCHAR, nullable=True)
    item_url = Column(VARCHAR, nullable=True)
    month_sale = Column(BIGINT, nullable=True)
    cover_img = Column(VARCHAR, nullable=True)
    category = Column(BIGINT, nullable=True)
    seller_name = Column(VARCHAR)
    vid = Column(BIGINT, nullable=True)
    coupon_money = Column(VARCHAR, nullable=True)
    commission_ratio = Column(VARCHAR, nullable=True)
    orders = Column(INT, default=1)
    b_imgs = Column(TEXT, nullable=True)
    d_imgs = Column(TEXT, nullable=True)

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}

    Base.to_dict = to_dict
    pass


class RichSpiderPipeline(object):
    def process_item(self, item, spider):
        return item


class SqlAlchemyPipeline(object):
    @classmethod
    def from_settings(cls, settings):
        sql_hp = settings.get('SQL_HP')
        return cls(sql_hp)

    def __init__(self, sql_hp):
        print(sql_hp)
        engine = create_engine('mysql+pymysql://%s:%s@%s:%s/%s?charset=utf8' %
                               (sql_hp['user'], sql_hp['pwd'], sql_hp['host'], sql_hp['port'], sql_hp['db']), encoding='utf-8', echo=False,
                               pool_size=100,
                               pool_recycle=10)
        self.db_session = sessionmaker(bind=engine)
        self.session = self.db_session()

    def process_item(self, item, spider):
        if spider.name == 'jd':
            cats = item['c']
            # session = self.db_session()
            for ga in item['d']:
                good = ga[0]
                rich_goods = RichGoods()
                rich_goods.plateform = 'JD'
                rich_goods.creation_date = time.strftime('%Y-%m-%d %H:%M:%S')
                rich_goods.last_updated_date = time.strftime('%Y-%m-%d %H:%M:%S')
                rich_goods.price = '%.2f' % good['wlPrice']
                rich_goods.price_val = good['wlPrice']
                rich_goods.item_url = 'https://item.jd.com/%s.html' % good['skuId']
                rich_goods.item_id = '%s' % good['skuId']
                rich_goods.month_sale = good['inOrderCount30Days']
                rich_goods.id = '%s-%s' % ('JD', good['skuId'])
                rich_goods.cover_img = 'http://img14.360buyimg.com/n1/%s' % good['materialUrl']
                rich_goods.category = int(cats[len(cats) - 1])
                rich_goods.title = good['skuName']
                rich_goods.seller_name = good['shopName']
                rich_goods.vid = good['vid']
                rich_goods.coupon_money = '%s' % good.get('couponDiscount', 0)
                rich_goods.commission_ratio = '%.2f' % good['wlCommissionRatio']
                rich_goods.now_price_val = good['wlPrice'] - good.get('couponDiscount', 0)
                rich_goods.now_price = '%.2f' % rich_goods.now_price_val

                rich_cmd = self.session.query(RichGoods).filter(RichGoods.id == rich_goods.id).first()
                if rich_cmd:
                    rich_cmd.last_updated_date = rich_goods.last_updated_date
                    rich_cmd.price = rich_goods.price
                    rich_cmd.price_val = rich_goods.price_val
                    rich_cmd.now_price_val = rich_goods.now_price_val
                    rich_cmd.now_price = rich_goods.now_price
                    rich_cmd.month_sale = rich_goods.month_sale
                    rich_cmd.commission_ratio = rich_goods.commission_ratio
                else:
                    self.session.add(rich_goods)
                self.session.commit()
            # session.close()
        pass