package com.promo.promocoesajax.service;

import com.promo.promocoesajax.domain.SocialMetaTag;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SocialMetaTagService {

    public SocialMetaTag getSocialMetaTagByUrl(String url) {
        SocialMetaTag twitter = getTwitterCardByUrl(url);
        if (!isEmpty(twitter)) {
            return twitter;
        }

        SocialMetaTag openGraph = getOpenGraphByUrl(url);
        if (!isEmpty(openGraph)) {
            return openGraph;
        }

        return null;
    }

    private static final Logger logger = LoggerFactory.getLogger(SocialMetaTagService.class);

    private SocialMetaTag getTwitterCardByUrl(String url) {
        SocialMetaTag tag = new SocialMetaTag();

        try {
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla")
                    .get();

            tag.setTitle(doc.head().select("meta[name=twitter:title]").attr("content"));
            tag.setSite(doc.head().select("meta[name=twitter:site]").attr("content"));
            tag.setImage(doc.head().select("meta[name=twitter:image]").attr("content"));
            tag.setUrl(doc.head().select("meta[name=twitter:url]").attr("content"));
        } catch (IOException e) {
            logger.error("Erro ao obter informações da URL " + url, e);
        }
        return tag;
    }

    private SocialMetaTag getOpenGraphByUrl(String url) {
        SocialMetaTag tag = new SocialMetaTag();

        try {
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla")
                    .get();

            tag.setTitle(doc.head().select("meta[property=og:title]").attr("content"));
            tag.setSite(doc.head().select("meta[property=og:site_name]").attr("content"));
            tag.setImage(doc.head().select("meta[property=og:image]").attr("content"));
            tag.setUrl(doc.head().select("meta[property=og:url]").attr("content"));
        } catch (IOException e) {
            logger.error("Erro ao obter informações da URL " + url, e);
        }
        return tag;
    }

    private boolean isEmpty(SocialMetaTag tag) {
        return tag.getTitle().isEmpty() ||
                tag.getSite().isEmpty() ||
                tag.getImage().isEmpty() ||
                tag.getUrl().isEmpty();
    }
}
