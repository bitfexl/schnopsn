package com.github.bitfexl.schnopsn.game;

import lombok.Getter;

import java.util.Stack;

public class GameRound {
    @Getter
    private final Stack<Card> cards;

    @Getter
    private final Card.Color trumpfColor;

    @Getter
    private Card trumpfCard;

    @Getter
    private final PlayerState firstPlayerState;

    @Getter
    private final PlayerState secondPlayerState;

    @Getter
    private PlayerState nextPlayerState;

    @Getter
    private Card playedCard;

    public GameRound() {
        cards = Card.createCardStack();
        trumpfCard = drawCard();
        trumpfColor = trumpfCard.color;

        firstPlayerState = new PlayerState();
        for (int i = 0; i < 5; i++) {
            firstPlayerState.getCards().add(drawCard());
        }

        secondPlayerState = new PlayerState();
        for (int i = 0; i < 5; i++) {
            secondPlayerState.getCards().add(drawCard());
        }

        nextPlayerState = firstPlayerState;
    }

    /**
     * Play a card as the currently next player.
     * Updates the played card and the next player also adds the Stich.
     * If playedCard is null after this method, check next player to determine who got the Stich.
     * @param card The card to play.
     * @return true: card played, false: card not played either because the player does not have the card, or it is prohibited because of endgame.
     */
    public boolean playCard(Card card) {
        boolean played = false;

        final PlayerState player = nextPlayerState;
        final PlayerState opponent = nextPlayerState == firstPlayerState ? secondPlayerState : firstPlayerState;

        if (playedCard == null) { // todo: check if not endgame
            played = playFirstCard(player, opponent, card);
        } else {
            played = playSecondCard(player, opponent, card);
        }



        return played;
    }

    private boolean playFirstCard(PlayerState player, PlayerState opponent, Card card) {
        if (player.canAnnounce(card)) {
            player.getAnsagen().add(card.color);
        }

        if (player.getCards().remove(card)) {
            playedCard = card;
            nextPlayerState = opponent;
            return true;
        }

        return false;
    }

    private boolean playSecondCard(PlayerState player, PlayerState opponent, Card card) {
        if (!player.getCards().remove(card)) {
            return false;
        }

        if (Card.getStich(playedCard, card, trumpfColor) == card) {
            player.getStiche().add(new CardPair(playedCard, card));
            player.getCards().add(drawCard()); // order is important
            opponent.getCards().add(drawCard()); // order is important
        } else {
            opponent.getStiche().add(new CardPair(playedCard, card));
            opponent.getCards().add(drawCard()); // order is important
            player.getCards().add(drawCard()); // order is important
            nextPlayerState = opponent;
        }

        playedCard = null;
        return true;
    }

    private Card drawCard() {
        if (cards.isEmpty()) {
            final Card tempCard = trumpfCard;
            trumpfCard = null;
            return tempCard;
        }

        return cards.pop();
    }
}
