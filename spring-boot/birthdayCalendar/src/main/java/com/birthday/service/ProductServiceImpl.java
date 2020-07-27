package com.birthday.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.birthday.exception.ResourceNotFoundException;
import com.birthday.model.Birthday;
import com.birthday.repository.BirthdayRepository;

@Service
@Transactional
public class ProductServiceImpl implements BirthdayService {

	@Autowired
	private BirthdayRepository birthdayRepository;
	
	@Override
	public Birthday createBirthday(Birthday birthday) {
		return birthdayRepository.save(birthday);
	}

	@Override
	public Birthday updateBirthday(Birthday birthday) {
		Optional<Birthday> birthdayDb=this.birthdayRepository.findById(birthday.getId());
		if(birthdayDb.isPresent()) {
			Birthday birthdayUpdate=birthdayDb.get();
			birthdayUpdate.setId(birthday.getId());
			birthdayUpdate.setTitle(birthday.getTitle());
			birthdayUpdate.setDate(birthday.getDate());
			birthdayRepository.save(birthdayUpdate);
			return birthdayUpdate;
		}else {
			throw new ResourceNotFoundException("Güncellenmek için gönderilen kayıt bulunamadı.");
		}
		
	}

	@Override
	public List<Birthday> getAllBirthdays(Sort sort) {
		return birthdayRepository.findAll(sort);
	}

	@Override
	public Birthday getBirthdayById(long birthdayId) {
		Optional<Birthday> birthdayDb = this.birthdayRepository.findById(birthdayId);
		if(birthdayDb.isPresent()) {
			return birthdayDb.get();
		}else {
			throw new ResourceNotFoundException("İstenen kayıt bulunamadı.");
		}
	}

	@Override
	public void deleteBirthday(long birthdayId) {
		Optional<Birthday> birthdayDb = this.birthdayRepository.findById(birthdayId);
		if(birthdayDb.isPresent()) {
			this.birthdayRepository.delete(birthdayDb.get());
		}else {
			throw new ResourceNotFoundException("Silmek için gönderilen kayıt bulunamadı.");
		}
		
	}

}
