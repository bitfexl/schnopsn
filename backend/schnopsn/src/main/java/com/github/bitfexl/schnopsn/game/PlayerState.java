package com.github.bitfexl.schnopsn.game;

import lombok.Getter;
import lombok.Setter;

import java.util.*;

public class PlayerState {
    @Getter
    private final List<Card> cards = new LinkedList<>();

    @Getter
    private final List<CardPair> stiche = new ArrayList<>();

    @Getter
    private final List<Card.Color> ansagen = new ArrayList<>();

    @Getter
    @Setter
    private int pointsAtClosing = -1;

    public int getPoints(Card.Color trumpf) {
        int points = 0;

        for (CardPair pair : stiche) {
            points += pair.first().value.value;
            points += pair.second().value.value;
        }

        if (points != 0) {
            for (Card.Color color : ansagen) {
                points += color == trumpf ? 40 : 20;
            }
        }

        return points;
    }

    /**
     * Get valid cards for zugeben.
     * @param playedCard The card played by the other player.
     * @param trumpf The Trumpf color.
     * @return All validly playable cards.
     */
    public Set<Card> validCards(Card playedCard, Card.Color trumpf) {
        final Set<Card> validCards = new HashSet<>();

        // Stechen mit selber Farbe
        for (Card card : cards) {
            if (card.color == playedCard.color && card.value.value > playedCard.value.value) {
                validCards.add(card);
            }
        }
        if (!validCards.isEmpty()) {
            return validCards;
        }

        // Selbe Farbe zugeben
        for (Card card : cards) {
            if (card.color == playedCard.color) {
                validCards.add(card);
            }
        }
        if (!validCards.isEmpty()) {
            return validCards;
        }

        // Mit Trumpf stechen
        for (Card card : cards) {
            if (card.color == trumpf) {
                validCards.add(card);
            }
        }
        if (!validCards.isEmpty()) {
            return validCards;
        }

        // All allowed
        return new HashSet<>(cards);
    }

    public boolean canAnnounce(Card card) {
        if (card.value != Card.Value.OBER && card.value != Card.Value.KOENIG) {
            return false;
        }

        boolean oberFound = false;
        boolean koenigFound = false;

        for (Card possibleCard : cards) {
            if (possibleCard.color == card.color) {
                oberFound |= possibleCard.value == Card.Value.OBER;
                koenigFound |= possibleCard.value == Card.Value.KOENIG;
            }
        }

        return oberFound && koenigFound;
    }
}
