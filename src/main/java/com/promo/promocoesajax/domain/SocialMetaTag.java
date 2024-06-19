package com.promo.promocoesajax.domain;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class SocialMetaTag implements Serializable {

    private String site;
    private String title;
    private String url;
    private String image;


    @Override
    public String toString() {
        return String.format("SocialMetaTag{site='%s', title='%s', url='%s', image='%s'}",
                site, title, url, image);
    }
}
