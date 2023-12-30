package com.practise.ecommerce.dao;

import com.practise.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.nio.file.Path;


@RepositoryRestResource(collectionResourceRel = "productCategory",path = "product-category")
public interface ProductCategoryRespository extends JpaRepository<ProductCategory,Long> {
}
