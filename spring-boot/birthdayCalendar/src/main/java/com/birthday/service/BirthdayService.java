package com.birthday.service;

import java.util.List;

import com.birthday.model.Birthday;

public interface BirthdayService {

	Birthday createBirthday(Birthday birthday);
	Birthday updateBirthday(Birthday birthday);
	List<Birthday> getAllBirthdays();
	Birthday getBirthdayById(long birthdayId);
	void deleteBirthday(long birthdayId);
	
	
}
