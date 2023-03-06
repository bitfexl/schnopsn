package com.github.bitfexl.schnopsn.game;

import lombok.RequiredArgsConstructor;

import java.util.Set;

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

    // generate card names
    /* public static void main(String[] args) {
        int i = 0;
        for (Color color : Color.values()) {
            for (Value value : Value.values()) {
                System.out.println(color + "_" + value + "(Color." + color + ", Value." + value + "),");
                i++;
            }
        }
        System.out.println(i + " cards.");
    } */
}
