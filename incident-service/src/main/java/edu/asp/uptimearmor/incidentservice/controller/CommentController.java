package edu.asp.uptimearmor.incidentservice.controller;

import edu.asp.uptimearmor.incidentservice.dto.CommentDTO;
import edu.asp.uptimearmor.incidentservice.entity.Comment;
import edu.asp.uptimearmor.incidentservice.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "**")
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @GetMapping("getCommentsByIncidentId/{incidentId}")
    public ResponseEntity<?> getComments(@PathVariable String incidentId){
        try {
            List<Comment>  commentList = commentService.getComments(incidentId);
            if(commentList!=null){
                return new ResponseEntity<>(commentList, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }
        catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/addComment")
    public ResponseEntity<?> createComment(@RequestBody CommentDTO commentDTO) {
        try {
            Comment savedComment = commentService.createComment(commentDTO);
            return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
        }
        catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
        }
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable String commentId){
        try{
            return new ResponseEntity<>(commentService.deleteComment(commentId), HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}


