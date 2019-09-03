FROM centos/python-36-centos7
MAINTAINER sunyh <etherealcoder@163.com>
ADD . /work
WORKDIR /work
ENV TZ='Asia/Shanghai'
RUN pip install -r requirements.txt
ENV spider="jd"
ENTRYPOINT [ "sh", "-c", "scrapy crawl $spider" ]