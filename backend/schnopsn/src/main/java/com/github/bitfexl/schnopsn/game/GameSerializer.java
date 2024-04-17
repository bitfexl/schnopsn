package com.github.bitfexl.schnopsn.game;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class GameSerializer {
    private final GameRound game;

    public void serializePlayer1() {
        game.getFirstPlayerState();

        game.getTrumpfColor();
        game.getTrumpfCard();
        game.getPlayedCard();

        game.getSecondPlayerState().getStiche().getFirst();
        game.getSecondPlayerState().getCards().size();
    }
}
