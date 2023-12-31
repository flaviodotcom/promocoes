package com.promo.promocoesajax.web.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.promo.promocoesajax.domain.Categoria;
import com.promo.promocoesajax.domain.Promocao;
import com.promo.promocoesajax.repository.CategoriaRepository;
import com.promo.promocoesajax.repository.PromocaoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;


@Controller
@RequestMapping("/promocao")
public class PromocaoController {

    private static final Logger log = LoggerFactory.getLogger(PromocaoController.class);

    @Autowired
    private PromocaoRepository promocaoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @PostMapping("/save")
    public ResponseEntity<?> salvarPromocao(@Valid Promocao promocao, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.unprocessableEntity().body(errors);
        }

        log.info("Promoção {}", promocao.toString());
        promocao.setDtCadastro(LocalDateTime.now());
        promocaoRepository.save(promocao);
        return ResponseEntity.ok().build();
    }

    @ModelAttribute("categorias")
    public List<Categoria> getCategorias() {
        return categoriaRepository.findAll();
    }

    @GetMapping("/add")
    public String abrirCadastro() {
        return "promo-add";
    }
}
