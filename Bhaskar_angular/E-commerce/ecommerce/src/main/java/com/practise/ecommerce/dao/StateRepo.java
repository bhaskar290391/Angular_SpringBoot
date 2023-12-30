package com.practise.ecommerce.dao;

import com.practise.ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


@RepositoryRestResource(collectionResourceRel = "states",path = "states")
public interface StateRepo extends JpaRepository<State,Integer> {

    List<State> findByCountryCode(@Param("code") String code);

}
