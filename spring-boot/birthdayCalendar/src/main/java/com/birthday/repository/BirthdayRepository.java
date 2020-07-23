package com.birthday.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.birthday.model.Birthday;

public interface BirthdayRepository extends JpaRepository<Birthday, Long> {

}
