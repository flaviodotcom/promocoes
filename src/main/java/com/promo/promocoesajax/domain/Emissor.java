package com.promo.promocoesajax.domain;

import lombok.Data;
import lombok.Setter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class Emissor {

    private String id = UUID.randomUUID().toString();
    @Setter
    private SseEmitter emitter;
    @Setter
    private LocalDateTime ultimaData;

    public Emissor(SseEmitter emitter, LocalDateTime ultimaData) {
        this.emitter = emitter;
        this.ultimaData = ultimaData;
    }

}
