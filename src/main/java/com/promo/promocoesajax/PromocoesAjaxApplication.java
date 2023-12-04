package com.promo.promocoesajax;

//import com.promo.promocoesajax.domain.SocialMetaTag;
import com.promo.promocoesajax.service.SocialMetaTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PromocoesAjaxApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(PromocoesAjaxApplication.class, args);
	}

    @Autowired
    SocialMetaTagService service;

    @Override
    public void run(String... args){
//        SocialMetaTag tag = service.getSocialMetaTagByUrl("https://rockcontent.com/br/blog/meta-tags-para-redes-sociais/");
//        System.out.println(tag.toString());
    }
}
