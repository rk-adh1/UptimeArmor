package edu.asp.uptimearmor.incidentservice.repository;

import edu.asp.uptimearmor.incidentservice.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {

    @Query("SELECT c FROM Comment c JOIN FETCH c.employee WHERE c.incident.incidentId = :incidentId")
    List<Comment> findAllByIncidentId(@Param("incidentId") String incidentId);

}
