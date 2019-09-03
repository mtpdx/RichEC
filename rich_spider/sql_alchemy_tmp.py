# !/usr/bin/env python
# encoding: utf-8  
"""
Created by sunyh on 2019/9/2
Description:
"""

from sqlalchemy import Column, create_engine, BIGINT, VARCHAR, INT, DATETIME, BINARY, FLOAT, TEXT
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import time

Base = declarative_base()


class RichGoods(Base):
    __tablename__ = 'RICH_GOODS'
    id = Column(VARCHAR(128), primary_key=True)
    plateform = Column(VARCHAR(32), nullable=True)
    title = Column(VARCHAR(256))
    create_by = Column(VARCHAR(64), default='system')
    creation_date = Column(DATETIME)
    last_updated_by = Column(VARCHAR(64), default='system')
    last_updated_date = Column(DATETIME)
    price = Column(VARCHAR(64))
    price_val = Column(FLOAT)
    now_price = Column(VARCHAR(64), nullable=True)
    now_price_val = Column(FLOAT, nullable=True)
    item_id = Column(VARCHAR(128))
    item_url = Column(TEXT, nullable=True)
    month_sale = Column(BIGINT, nullable=True)
    cover_img = Column(TEXT)
    category = Column(BIGINT, nullable=True)
    seller_name = Column(VARCHAR(256))
    vid = Column(BIGINT, nullable=True)
    coupon_money = Column(VARCHAR(64), nullable=True)
    commission_ratio = Column(VARCHAR(32), nullable=True)
    orders = Column(INT, default=1)
    b_imgs = Column(TEXT, nullable=True)
    d_imgs = Column(TEXT, nullable=True)

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}

    Base.to_dict = to_dict
    pass


sql_hp = {
    'host': '192.168.1.136',
    'port': 3306,
    'user': 'root',
    'pwd': '12345678',
    'db': 'rich_data',
}

engine = create_engine('mysql+pymysql://%s:%s@%s:%s/%s?charset=utf8' %
                       (sql_hp['user'], sql_hp['pwd'], sql_hp['host'], sql_hp['port'], sql_hp['db']), encoding='utf-8', echo=False,
                       pool_size=100,
                       pool_recycle=10)

# Base.metadata.create_all(engine)

db_session = sessionmaker(bind=engine)
session = db_session()

if __name__ == '__main__':

    pass
