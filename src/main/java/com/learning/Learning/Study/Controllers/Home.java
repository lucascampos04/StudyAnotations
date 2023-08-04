package com.learning.Learning.Study.Controllers;

import com.learning.Learning.Study.model.CardModel;
import com.learning.Learning.Study.model.CardModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@Controller
public class Home {

    private final CardModelRepository cardModelRepository;

    @Autowired
    public Home(CardModelRepository cardModelRepository){
        this.cardModelRepository = cardModelRepository;
    }

    private List<CardModel> cards = new ArrayList<>();

    private Long nextId = 1L;

    @GetMapping("/")
    public ModelAndView index(){
    ModelAndView mv = new ModelAndView("Pags/index");
    mv.addObject("cards", cards);
    return mv;
    }

    @PostMapping("/createCard")
    @ResponseBody
    public CardModel createCard(@RequestParam String title){
        CardModel card = new CardModel();
        card.setId(nextId++);
        card.setTitle(title);
        card.setNotes(new ArrayList<>());
        cards.add(card);
        return card;
    }

    @PostMapping("/deleteCard")
    @ResponseBody
    public void deleteCard(@RequestParam Long id){
        cards.removeIf(card -> card.getId().equals(id));
    }


}
