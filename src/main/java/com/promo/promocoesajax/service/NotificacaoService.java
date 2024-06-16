package com.promo.promocoesajax.service;

import com.promo.promocoesajax.domain.Emissor;
import com.promo.promocoesajax.repository.PromocaoRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@EnableScheduling
@Service
public class NotificacaoService {

    @Autowired
    private PromocaoRepository repository;

    public void onOpen(Emissor emissor) throws IOException {
        emissor.getEmitter().send(SseEmitter.event()
                .data(" ")
                .id(emissor.getId()));
    }

    @Scheduled(fixedRate = 60000)
    public void notificar() {
        List<Emissor> emissoresErros = new ArrayList<>();
        this.emissores.forEach(emissor -> {
            try {
                Map<String, Object> map = repository.countAndMaxNovasPromocoesByDtCadastro(emissor.getUltimaData());
                long count = (long) map.get("count");

                if (count > 0) {
                    emissor.setUltimaData((LocalDateTime) map.get("lastDate"));
                    emissor.getEmitter().send(SseEmitter.event()
                            .data(count)
                            .id(emissor.getId()));
                }
            } catch (IOException e) {
                emissoresErros.add(emissor);
            }
        });
        this.emissores.removeAll(emissoresErros);
    }

    public void addEmissor(Emissor emissor) {
        this.emissores.add(emissor);
    }

    public void removeEmissor(Emissor emissor) {
        this.emissores.remove(emissor);
    }

    @Getter
    private final CopyOnWriteArrayList<Emissor> emissores = new CopyOnWriteArrayList<>();

}
