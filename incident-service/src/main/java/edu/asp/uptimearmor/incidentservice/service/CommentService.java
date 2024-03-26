package edu.asp.uptimearmor.incidentservice.service;

import edu.asp.uptimearmor.incidentservice.dto.CommentDTO;
import edu.asp.uptimearmor.incidentservice.entity.Comment;
import edu.asp.uptimearmor.incidentservice.entity.Employee;
import edu.asp.uptimearmor.incidentservice.entity.Incident;
import edu.asp.uptimearmor.incidentservice.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    public List<Comment> getComments(String incidentId){
        return commentRepository.findAllByIncidentId(incidentId);
    }

    public Comment createComment(CommentDTO commentDTO) {
        Comment comment = new Comment();
        comment.setNote(commentDTO.getNote());
        comment.setCreationDate(commentDTO.getCreationDate());
        comment.setIncident(commentDTO.getIncident());
        comment.setEmployee(commentDTO.getEmployee());
        return commentRepository.save(comment);
    }

    public String deleteComment(String commentId){
         String sts = "";
        try {
            commentRepository.deleteById(commentId);
            sts = "Deleted";
        }
        catch (Exception ex){
            sts  = "Exception occurred, unable to delete";
        }
        return  sts;
    }


}
