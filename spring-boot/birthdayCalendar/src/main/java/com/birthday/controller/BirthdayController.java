package com.birthday.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.birthday.model.Birthday;
import com.birthday.service.BirthdayService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BirthdayController {
	
	@Autowired
	private BirthdayService birthdayService;
	
	@GetMapping("/birthdays")
	public ResponseEntity<List<Birthday>> getAllBirthdays(){
		Sort sort=Sort.by(Sort.Order.asc("date"));
		return ResponseEntity.ok().body(birthdayService.getAllBirthdays(sort));
	}
	
	@PostMapping("/birthdays")
	public ResponseEntity<Birthday> createBirthday(@RequestBody Birthday birthday){
		return ResponseEntity.ok().body(this.birthdayService.createBirthday(birthday));
	}
	
	@GetMapping("/birthdays/{id}")
	public ResponseEntity<Birthday> getBirthdayById(@PathVariable long id){
		return ResponseEntity.ok().body(birthdayService.getBirthdayById(id));
	}
	
	@PutMapping("/birthdays/{id}")
	public ResponseEntity<Birthday> updateBirthday(@PathVariable long id,@RequestBody Birthday birthday){
		birthday.setId(id);
		return ResponseEntity.ok().body(birthdayService.updateBirthday(birthday));
	}
	
	@DeleteMapping("/birthdays/{id}")
	public HttpStatus deleteBirthday(@PathVariable long id){
		this.birthdayService.deleteBirthday(id);
		return HttpStatus.OK;		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
