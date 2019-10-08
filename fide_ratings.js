const axios = require("axios");
const cheerio = require("cheerio");
const utils = require("./utils");

const getPlayerInfo = async (fide_num) => {
    const res = await axios.get(`https://ratings.fide.com/profile/${fide_num}`);
    const $ = cheerio.load(res.data);

    const name = $(".profile-top-title")[0].children[0].data;

    const world_rank_all_players = parseInt($("table.profile-table:first-child tbody tr:first-child td")[1].children[0].data, 10);
    const world_rank_active_players = parseInt($("table.profile-table:first-child tbody tr:nth-child(2) td")[1].children[0].data, 10);
    const national_rank_all_players = parseInt($("table.profile-table:first-child tbody tr:first-child td")[3].children[0].data, 10);
    const national_rank_active_players = parseInt($("table.profile-table:first-child tbody tr:nth-child(2) td")[3].children[0].data, 10);
    const continental_rank_all_players = parseInt($("table.profile-table:first-child tbody tr:first-child td")[5].children[0].data, 10);
    const continental_rank_active_players = parseInt($("table.profile-table:first-child tbody tr:nth-child(2) td")[5].children[0].data, 10);

    const standard_elo = $(".profile-top-rating-data")[0].children[2].data.replace(/\s/g, "");
    const rapid_elo = $(".profile-top-rating-data")[1].children[2].data.replace(/\s/g, "");
    const blitz_elo = $(".profile-top-rating-data")[2].children[2].data.replace(/\s/g, "");

    const federation = $(".profile-top-info__block__row__data")[1].children[0].data;
    const birth_year = parseInt($(".profile-top-info__block__row__data")[3].children[0].data, 10);
    const sex = $(".profile-top-info__block__row__data")[4].children[0].data;
    const title = $(".profile-top-info__block__row__data")[5].children[0].data;

    return {
        name,
        fide_num,
        federation,
        birth_year,
        sex,
        title,
        standard_elo,
        rapid_elo,
        blitz_elo,
        world_rank_all_players,
        world_rank_active_players,
        national_rank_all_players,
        national_rank_active_players,
        continental_rank_all_players,
        continental_rank_active_players,
    };
};

const getPlayerElo = async (fide_num) => {
    const res = await axios.get(`https://ratings.fide.com/profile/${fide_num}`);
    const $ = cheerio.load(res.data);
    const elo_row = $(".profile-top-rating-data");

    return {
        standard: elo_row[0].children[2].data.replace(/\s/g, ""),
        rapid: elo_row[1].children[2].data.replace(/\s/g, ""),
        blitz: elo_row[2].children[2].data.replace(/\s/g, ""),
    };
};

const getPlayerHistory = async (fide_num, csv_output) => {
    const res = await axios.get(`https://ratings.fide.com/profile/${fide_num}/chart`);
    const $ = cheerio.load(res.data);
    const table_entries = $("table.profile-table.profile-table_chart-table tbody tr");

    const history = [];
    table_entries.map((i) => {
        const row = cheerio.load(table_entries[i])("td");
        history.push({
            date: row[0].children[0].data.replace(/\s/g, ""),
            numeric_date: utils.parseDate(row[0].children[0].data.replace(/\s/g, "")),
            standard: row[1].children[0].data.replace(/\s/g, ""),
            num_standard_games: row[2].children[0].data.replace(/\s/g, ""),
            rapid: row[3].children[0].data.replace(/\s/g, ""),
            num_rapid_games: row[4].children[0].data.replace(/\s/g, ""),
            blitz: row[5].children[0].data.replace(/\s/g, ""),
            num_blitz_games: row[6].children[0].data.replace(/\s/g, ""),
        });
    });
    return csv_output ? history.sort((e1, e2) => e2.numeric_date - e1.numeric_date).map((entry) =>
        utils.ratingJSONToCSV(entry),
    ) : history;
};

module.exports = {
    getPlayerInfo,
    getPlayerElo,
    getPlayerHistory,
};
