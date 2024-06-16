package com.promo.promocoesajax.dto;

import com.promo.promocoesajax.domain.Categoria;
import lombok.Data;
import org.springframework.format.annotation.NumberFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class PromocaoDTO {

    @NotNull
    private Long id;

    @NotBlank(message = "É necessário inserir Um título")
    private String titulo;

    private String descricao;

    @NotBlank(message = "Por favor, insira o link da imagem")
    private String linkImagem;

    @NotNull(message = "É necessário inserir o preço da promoção")
    @NumberFormat(style = NumberFormat.Style.CURRENCY, pattern = "#,##0.00")
    private BigDecimal preco;

    @NotNull(message = "Por favor, insira uma categoria")
    private Categoria categoria;

}
