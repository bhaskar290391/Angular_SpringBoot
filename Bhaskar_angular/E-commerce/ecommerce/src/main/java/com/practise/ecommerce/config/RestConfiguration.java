package com.practise.ecommerce.config;

import com.practise.ecommerce.entity.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class RestConfiguration implements  RepositoryRestConfigurer{

    @Autowired
    private EntityManager manager;

    @Value("${allowed-origins}")
    private String[] allowedOrigins;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] method={
                HttpMethod.DELETE,HttpMethod.PUT,HttpMethod.POST,HttpMethod.PATCH
        };



        disabledHttpMethod(config, method,Product.class);
        disabledHttpMethod(config, method,ProductCategory.class);
        disabledHttpMethod(config, method, Country.class);
        disabledHttpMethod(config, method, State.class);
        disabledHttpMethod(config, method, Order.class);

        exposeIDs(config);

        cors.addMapping(config.getBasePath()+"/**").allowedOrigins(allowedOrigins);
    }

    private static void disabledHttpMethod(RepositoryRestConfiguration config, HttpMethod[] method,Class theClass) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(method)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(method)));
    }

    private void exposeIDs(RepositoryRestConfiguration config) {

        Set<EntityType<?>> entities = manager.getMetamodel().getEntities();

        List<Class> entityClass=new ArrayList<>();

        for (EntityType tempType:
             entities) {
            entityClass.add(tempType.getJavaType());
        }

        Class[] enttityArray=entityClass.toArray(new Class[0]);

        config.exposeIdsFor(enttityArray);
    }
}
