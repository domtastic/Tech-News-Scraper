const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let HeadlineSchema = new Schema({

    title: {
        type: String,
        required: true
		},
		img: {
			type: String,
			required: true
		},
    link: {
        type: String,
        required: true
    },
    notes: [
			{
				type: Schema.Types.ObjectId,
				ref: "Note"
      }
    ]
});

let Headline = mongoose.model('Headline', HeadlineSchema);

module.exports = Headline;