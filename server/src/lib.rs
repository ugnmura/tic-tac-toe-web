use spacetimedb::{Identity, ReducerContext, SpacetimeType, Table};

#[derive(SpacetimeType, Clone, PartialEq, Eq, Debug)]
pub enum FieldState {
    Cross,
    Circle,
}

#[derive(SpacetimeType, Clone, PartialEq, Eq, Debug)]
pub enum GameResult {
    Winner(FieldState),
    Draw,
}

#[spacetimedb::table(name = game, public)]
#[derive(Debug)]
pub struct Game {
    #[primary_key]
    pub id: String,
    pub field: Vec<Option<FieldState>>,
    pub current_turn: FieldState,
    pub player_x: Option<Identity>,
    pub player_o: Option<Identity>,
    pub result: Option<GameResult>,
    pub x_score: u32,
    pub o_score: u32,
    pub tie_score: u32,
}

#[spacetimedb::reducer]
pub fn create_game(ctx: &ReducerContext, id: String) {
    let game = Game {
        id: id.clone(),
        field: vec![None; 9],
        current_turn: FieldState::Cross,
        player_x: Some(ctx.sender),
        player_o: None,
        result: None,
        x_score: 0,
        o_score: 0,
        tie_score: 0,
    };
    ctx.db.game().insert(game);
}

#[spacetimedb::reducer]
pub fn join_game(ctx: &ReducerContext, id: String) -> Result<(), String> {
    if let Some(mut game) = ctx.db.game().id().find(&id) {
        if game.player_o.is_none() {
            game.player_o = Some(ctx.sender);
            ctx.db.game().id().update(game);
            Ok(())
        } else {
            Err("Game already has a second player".into())
        }
    } else {
        Err("Game not found".into())
    }
}

fn check_winner(field: &[Option<FieldState>]) -> Option<GameResult> {
    const WIN_PATTERNS: [[usize; 3]; 8] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for [a, b, c] in WIN_PATTERNS {
        if let (Some(x), Some(y), Some(z)) = (&field[a], &field[b], &field[c]) {
            if x == y && y == z {
                return Some(GameResult::Winner(x.clone()));
            }
        }
    }

    if field.iter().all(|cell| cell.is_some()) {
        return Some(GameResult::Draw);
    }

    None
}

#[spacetimedb::reducer]
pub fn make_move(ctx: &ReducerContext, id: String, index: u32) -> Result<(), String> {
    let index = usize::try_from(index).unwrap_or(9999);
    if let Some(mut game) = ctx.db.game().id().find(&id) {
        if !game.result.is_none() {
            return Err("Game has already ended".into());
        }

        if index >= 9 || game.field[index].is_some() {
            return Err("Invalid move".into());
        }

        let player_identity = ctx.sender;
        let is_player_turn = match game.current_turn {
            FieldState::Cross => game.player_x == Some(player_identity),
            FieldState::Circle => game.player_o == Some(player_identity),
        };

        if !is_player_turn {
            return Err("It's not your turn".into());
        }

        game.field[index] = Some(game.current_turn.clone());
        game.result = check_winner(&game.field);

        if let Some(result) = &game.result {
            match result {
                GameResult::Winner(winner) => match winner {
                    FieldState::Cross => game.x_score += 1,
                    FieldState::Circle => game.o_score += 1,
                },
                GameResult::Draw => {
                    game.tie_score += 1;
                }
            }
        } else {
            game.current_turn = match game.current_turn {
                FieldState::Cross => FieldState::Circle,
                FieldState::Circle => FieldState::Cross,
            };
        }

        ctx.db.game().id().update(game);
        Ok(())
    } else {
        Err("Game not found".into())
    }
}

#[spacetimedb::reducer]
pub fn reset_game(ctx: &ReducerContext, id: String) -> Result<(), String> {
    if let Some(mut game) = ctx.db.game().id().find(&id) {
        game.field = vec![None; 9];
        game.result = None;

        game.current_turn = if (game.x_score + game.o_score + game.tie_score) % 2 == 0 {
            FieldState::Cross
        } else {
            FieldState::Circle
        };

        ctx.db.game().id().update(game);
        Ok(())
    } else {
        Err("Game not found".into())
    }
}
