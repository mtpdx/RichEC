# !/usr/bin/env python
# encoding: utf-8  
"""
Created by sunyh on 2019/9/2
Description:
"""

from scrapy.cmdline import execute

import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
execute(["scrapy", "crawl", "jd"])
