package com.promo.promocoesajax.web.controller;

import com.promo.promocoesajax.domain.Emissor;
import com.promo.promocoesajax.repository.PromocaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;

@Controller
public class NotificacaoController {

    @Autowired
    PromocaoRepository repository;

    @GetMapping("/promocao/notificacao")
    public SseEmitter enviarNotificacao() throws IOException {
        SseEmitter emitter = new SseEmitter(0L);
        Emissor emissor = new Emissor(emitter, getDtCadastroUltimaPromocao());
        emissor.getEmitter().send(emissor.getUltimaData());
        return emitter;
    }

    private LocalDateTime getDtCadastroUltimaPromocao() {
        return repository.findPromocaoComUltimaData();
    }
}
