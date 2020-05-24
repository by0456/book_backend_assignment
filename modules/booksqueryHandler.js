const booksquery = require('./bookquery')

exports.doBookSearch = (req, res, next) => {

	const q = req.query.q  

	booksquery.doBookSearch(q, (err, result) => {
		if (err) return  res.send(501, err)
		return  res.send(result)
		 		
	})


}

