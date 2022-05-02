## Index .py 
# This script extrac data from mercado libre and 
# create list of prices and name of items

from dataclasses import replace
import scrapy as sc
from scrapy.item import Field
from scrapy.item import Item
from scrapy.spiders import CrawlSpider, Rule
from scrapy.selector import Selector
from scrapy.loader.processors import MapCompose
from scrapy.linkextractors import LinkExtractor
from scrapy.loader import ItemLoader
from selenium import webdriver
import webbrowser as wb
import os


class Article(Item):
    tn = Field()
    sc = Field()
    sp = Field()
    vd = Field()

class MercadoLibreCrawler(CrawlSpider):
    name = 'pageSelect'

    custom_settings = {
      'USER_AGENT': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/71.0.3578.80 Chrome/71.0.3578.80 Safari/537.36',
      'CLOSESPIDER_PAGECOUNT': 2 
    }

    allowed_domains = ['articulo.mercadolibre.com.co', 'listado.mercadolibre.com.co']

    start_urls = ['https://listado.mercadolibre.com.co/computadores']

    download_delay = 1
    rules = (
        Rule( 
            LinkExtractor(
                allow=r'/_Desde_\d+' 
            ), follow=True),
        Rule( 
            LinkExtractor(
                allow=r'/MCO-' 
            ), follow=True, callback='parseItems'),
    )

   # def orderData(self, cdata):
        #eliminar dobles simbolos
        #ctext = cdata.replace('\n', '').replace('\r', '').replace('\t').strip()
        #return ctext

    def parseItems(self, response):

        item = ItemLoader(Article(), response)
        
        item.add_xpath('tn', '//h1/text()')
        item.add_xpath('sc', '//span[@class="andes-money-amount__currency-symbol"]/text()')
        item.add_xpath('sp', '//span[@class="andes-money-amount__fraction"]/text()')
        item.add_xpath('vd', '//p[@class="ui-pdp-description__content"]/text()')


        yield item.load_item()


#driver = webdriver.Chrome('./drivers/chromedriver.exe')
#driver.get('https://listado.mercadolibre.com.co/computadores')
# Open explorer on page

#windows
#os.system("start \"\" https://google.com")
#linux
#os.system("xdg-open \"\" https://example.com")
#mac
#os.system("open \"\" https://example.com")
#cross
#wb.open(PageData.mainUrl)


print('hello customers run with')
print('scrapy runspider index.py -o data.csv -t csv')


