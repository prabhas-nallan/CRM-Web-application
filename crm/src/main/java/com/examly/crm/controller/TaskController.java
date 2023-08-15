package com.examly.crm.controller;



import com.examly.crm.model.Task;
import com.examly.crm.repository.TaskRepository;
import com.examly.crm.service.TaskNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
 @CrossOrigin("http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskRepository userRepository;

    @PostMapping("/task")
    Task newUser(@RequestBody Task newUser){
        return userRepository.save(newUser);
    }

    @GetMapping("/task")
    List<Task> getAllUsers(){
        return userRepository.findAll();
    }
    @GetMapping("/task/{id}")
    Task getUserById(@PathVariable Long id){
        return userRepository.findById(id)
                .orElseThrow(()->new TaskNotFoundException(id));
    }

    @PutMapping("/task/{id}")
    Task updateUser(@RequestBody Task newUser,@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(newUser.getName());
                    user.setEmail(newUser.getEmail());
                    user.setDescription(newUser.getDescription());
                    user.setAssignedto(newUser.getAssignedto());
                    user.setDuedate(newUser.getDuedate());
                    user.setCreatedat(newUser.getCreatedat());
                    user.setCompletedat(newUser.getCompletedat());
                    user.setUpdatedat(newUser.getUpdatedat());
                    return userRepository.save(user);

                }).orElseThrow(()->new TaskNotFoundException(id));
    }

            @DeleteMapping("/task/{id}")
            String deleteUser(@PathVariable Long id){
               if(!userRepository.existsById(id)){
                   throw new TaskNotFoundException(id);
               }
               userRepository.deleteById(id);
               return "User with id "+id+" has been deleted successfully";
    }



}
