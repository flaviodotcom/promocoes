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
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
                    .cookie("name", "value")
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
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
                    .cookie("name", "value")
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
        if (tag.getTitle().isEmpty()) return true;
        if (tag.getSite().isEmpty()) return true;
        if (tag.getImage().isEmpty()) return true;
        if (tag.getUrl().isEmpty()) return true;
        return false;
    }
}
