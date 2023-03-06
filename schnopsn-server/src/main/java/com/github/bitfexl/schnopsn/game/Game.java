package com.github.bitfexl.schnopsn.game;

import java.util.LinkedList;

public class Game {
    // linked list because of deque
    private LinkedList<Card> availableCards = newShuffle(100);

    private LinkedList<Card> newShuffle(int switches) {
        LinkedList<Card> cards = new LinkedList<>(Card.cards);

        for (int i = 0; i < switches; i++) {
            int ia = (int)(Math.random() * cards.size()), ib = (int)(Math.random() * cards.size());
            Card a = cards.get(ia);
            cards.set(ia, cards.get(ib));
            cards.set(ib, a);
        }

        return cards;
    }
}
