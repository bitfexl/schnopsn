package com.github.bitfexl.schnopsn.game;

import lombok.RequiredArgsConstructor;

import java.util.*;

/**
 * Names are german because english names are not suitable.
 */
@RequiredArgsConstructor
public enum Card {
    HERZ_UNTER(Color.HERZ, Value.UNTER),
    HERZ_OBER(Color.HERZ, Value.OBER),
    HERZ_KOENIG(Color.HERZ, Value.KOENIG),
    HERZ_ZEHNER(Color.HERZ, Value.ZEHNER),
    HERZ_SAU(Color.HERZ, Value.SAU),
    SCHELLE_UNTER(Color.SCHELLE, Value.UNTER),
    SCHELLE_OBER(Color.SCHELLE, Value.OBER),
    SCHELLE_KOENIG(Color.SCHELLE, Value.KOENIG),
    SCHELLE_ZEHNER(Color.SCHELLE, Value.ZEHNER),
    SCHELLE_SAU(Color.SCHELLE, Value.SAU),
    BLATT_UNTER(Color.BLATT, Value.UNTER),
    BLATT_OBER(Color.BLATT, Value.OBER),
    BLATT_KOENIG(Color.BLATT, Value.KOENIG),
    BLATT_ZEHNER(Color.BLATT, Value.ZEHNER),
    BLATT_SAU(Color.BLATT, Value.SAU),
    EICHEL_UNTER(Color.EICHEL, Value.UNTER),
    EICHEL_OBER(Color.EICHEL, Value.OBER),
    EICHEL_KOENIG(Color.EICHEL, Value.KOENIG),
    EICHEL_ZEHNER(Color.EICHEL, Value.ZEHNER),
    EICHEL_SAU(Color.EICHEL, Value.SAU);

    public static final Set<Card> cards = Set.of(values());

    public final Color color;
    public final Value value;

    public enum Color {
        HERZ,
        SCHELLE,
        BLATT,
        EICHEL
    }

    @RequiredArgsConstructor
    public enum Value {
        UNTER(2),
        OBER(3),
        KOENIG(4),
        ZEHNER(10),
        SAU(11);

        public final int value;
    }

    /**
     * Returns the card which gets the Stich.
     * @param first The first card played.
     * @param second The second card played.
     * @param trumpf The Trumpf color.
     * @return The first card if its value is more than (or equal to, should not happen)
     * the second cards value and the second card is the same color and not Trumpf
     * or if the second card is not of the same color, otherwise it returns the second card.
     */
    public static Card getStich(Card first, Card second, Color trumpf) {
        if (first.color == second.color) {
            return first.value.value < second.value.value ? second : first;
        }

        if (second.color == trumpf) {
            return second;
        }

        return first;
    }

    public static Stack<Card> createCardStack() {
        final Random random = new Random();
        final List<Card> availableCards = new LinkedList<>(cards);
        final Stack<Card> cardsStack = new Stack<>();

        while (!availableCards.isEmpty()) {
            cardsStack.add(availableCards.remove(random.nextInt(availableCards.size())));
        }

        return cardsStack;
    }
}