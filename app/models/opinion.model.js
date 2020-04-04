let conn = require("./connection");

let Opinion = function(opinion) {
  this.user_id = opinion.user_id;
  this.article_id = opinion.article_id;
  this.opinion_id = opinion.opinion_id;
};

// get all opinions for an article
Opinion.getAllOpinions = function(article_id, result) {
    conn.query(` 
        SELECT * FROM opinions
        WHERE is_reply = 'false' AND
        opinion_id IN
        (SELECT opinion_id from opinions 
            WHERE article_id = '${article_id}') `,
        (err, res) => {
            if (err) {
                console.log("Error fetching opinions: ", err);
                result(err, null);
            } else {
                console.log("Fetched all opinions");
                result(null, res);
            }
        }
    );
};

// insert opinion
// insert reply for an opinion 
// is_reply : 0 for opinion and 1 for reply
Opinion.insertOpinion = function(newOpinion, result) {
    conn.query(
      `INSERT INTO opinions SET ? `,
      newOpinion,
      (err, res) => {
        if (err) {
          console.log("Error inserting opinion: ", err);
          let error = err;
          if (err.code == "ER_NO_REFERENCED_ROW_2") {
            error = {
              error: "Foreign key constraint fails"
            };
          }
          result(error, null);
        } else {
          let responseMessage = {
            message: "Successfully inserted opinion"
          };
          console.log("Successfully inserted opinion");
          result(null, responseMessage);
        }
      }
    );
};

// view replies for an opinion
Opinion.getAllReplies = function(opinion_id, article_id, result) {
    conn.query(` SELECT * FROM opinions 
    WHERE is-reply = 'true' AND article_id = ${article_id}
    AND
    opinion_id IN 
    (SELECT reply_id FROM opinion_replies
        WHERE opinion_id = '${opinion_id}' 
    ) `,
    (err, res) => {
      if (err) {
        console.log("Error fetching followers: ", err);
        result(err, null);
      } else {
        console.log("Fetched all followers");
        result(null, res);
      }
    }
  );
};

module.exports = Opinion;


