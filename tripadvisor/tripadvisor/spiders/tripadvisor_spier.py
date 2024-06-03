import scrapy


class TripadvisorSpiderSpider(scrapy.Spider):
    name = "tripadvisor_spider"
    allowed_domains = ["tripadvisor.com"]
    start_urls = [
        'https://www.tripadvisor.com/Hotel_Review-g187791-d203127-Reviews-Hotel_Delle_Nazioni-Rome_Lazio.html',
        'https://www.tripadvisor.com/Hotel_Review-g60763-d75677-Reviews-New_York_Hilton_Midtown-New_York_City_New_York.html'
    ]

    custom_settings = {
        'FEEDS': {
            'reviews.json': {
                'format': 'json',
                'encoding': 'utf8',
                'store_empty': False,
                'indent': 4,
            },
        },
        'DOWNLOAD_DELAY': 3,  # Delay to avoid being blocked
        'RANDOMIZE_DOWNLOAD_DELAY': True,
        'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'TELNETCONSOLE_ENABLED': False,
    }

    def parse(self, response):
        hotel_name = response.xpath('//h1/text()').get() or 'Unknown Hotel'
        reviews = response.xpath('//div[@class="review-container"]')
        
        if not reviews:
            self.log(f"No reviews found on page: {response.url}")

        for review in reviews:
            try:
                user_id = review.xpath('.//div[@class="info_text pointer_cursor"]/text()').get()
                rating = review.xpath('.//span[contains(@class, "ui_bubble_rating")]/@class').re_first(r'\d+')
                rating = int(rating) / 10 if rating else None
                review_title = review.xpath('.//a[@class="title"]/text()').get()
                review_text = review.xpath('.//q[@class="IRsGHoPm"]/text()').get()

                yield {
                    'hotel_name': hotel_name,
                    'user_id': user_id,
                    'rating': rating,
                    'review_title': review_title,
                    'review_text': review_text,
                }
            except Exception as e:
                self.log(f"Error parsing review on page {response.url}: {e}")

