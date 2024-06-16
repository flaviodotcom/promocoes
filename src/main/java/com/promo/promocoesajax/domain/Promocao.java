package com.promo.promocoesajax.domain;

import lombok.Data;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.format.annotation.NumberFormat.Style;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "promocoes")
public class Promocao implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "É necessário inserir Um título")
    @Column(name = "titulo", nullable = false)
    private String titulo;

    @NotBlank(message = "Por favor, insira o link da promoção")
    @Column(name = "link_promocao", nullable = false, length = 500)
    private String linkPromocao;

    @Column(name = "site_promocao", nullable = false)
    private String site;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "link_imagem", nullable = false)
    private String linkImagem;

    @NotNull(message = "É necessário inserir o preço")
    @NumberFormat(style = Style.CURRENCY, pattern = "#,##0.00")
    @Column(name = "preco_promocao", nullable = false)
    private BigDecimal preco;

    @Column(name = "total_likes")
    private int likes;

    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime dtCadastro;

    @NotNull(message = "Insira uma categoria")
    @ManyToOne
    @JoinColumn(name = "categoria_fk")
    private Categoria categoria;

    @Override
    public String toString() {
        return "Promocao{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", linkPromocao='" + linkPromocao + '\'' +
                ", site='" + site + '\'' +
                ", descricao='" + descricao + '\'' +
                ", linkImagem='" + linkImagem + '\'' +
                ", preco=" + preco +
                ", likes=" + likes +
                ", dtCadastro=" + dtCadastro +
                ", categoria=" + categoria +
                '}';
    }
}
