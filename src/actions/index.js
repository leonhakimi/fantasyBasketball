import { startOfISOWeek, formatISO } from "date-fns";
import axios from "axios";
import { UPDATE_PLAYERS } from "./types";

const calculatePoints = ({ pts, reb, ast, blk, stl, turnover, fga, fgm, fg3m, ftm, fta }) => {
  return pts + fg3m - fga + (2 * fgm) - fta + ftm + reb + (2 * ast) + (4 * stl) + (4 * blk) - (2 * turnover);
};

export const updatePlayers = (players) => async (dispatch) => {
  const dateQuery =
    "?start_date=" +
    formatISO(startOfISOWeek(new Date()), {
      representation: "date",
    });
  
  const playerQuery = players
      .map((player) => `&player_ids[]=${player.value}`)
      .join("");

  const { data } = await axios.get(
    "https://www.balldontlie.io/api/v1/stats" + dateQuery + playerQuery
  );

  const stats = data.data.map((gamelog) => {
    return {
      id: gamelog.id,
      name:`${gamelog.player.first_name} ${gamelog.player.last_name}`,
      playerId: gamelog.player.id,
      pts: calculatePoints(gamelog),
      date: new Date(gamelog.game.date),
    };
  });
  dispatch({
    type: UPDATE_PLAYERS,
    payload: stats,
  });
};
