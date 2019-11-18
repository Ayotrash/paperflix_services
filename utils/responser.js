// INFORMATIONAL RESPONSES
exports.informational_continue = (message) => ({
	statusCode: 100,
	error: false,
	message: message
})

exports.information_switching_protocols = (message) => ({
	statusCode: 101,
	error: false,
	message: message
})

exports.information_processing = (message) => ({
	statusCode: 102,
	error: false,
	message: message
})


// SUCCESSS RESPONSE - 2XX
exports.success_OK = (message, data) => ({
	statusCode: 200,
	error: false,
	message: message,
	data: data
})

exports.success_created = (message, data) => ({
	statusCode: 201,
	error: false,
	message: message,
	data: data
})

exports.success_accepted = (message, data) => ({
	statusCode: 202,
	error: false,
	message: message,
	data: data
})

exports.success_non_authoritative = (message, data) => ({
	statusCode: 203,
	error: false,
	message: message,
	data: data
})

exports.success_no_content = (message, data) => ({
	statusCode: 204,
	error: false,
	message: message,
	data: data
})

exports.success_reset_content = (message) => ({
	statusCode: 205,
	error: false,
	message: message,
	data: null
})

exports.success_partial_content = (message, data) => ({
	statusCode: 206,
	error: false,
	message: message,
	data: data
})

exports.success_multi_status = (message, data) => ({
	statusCode: 207,
	error: false,
	message: message,
	data: data
})

exports.success_already_reported = (message, data) => ({
	statusCode: 208,
	error: false,
	message: message,
	data: data
})

exports.success_IM_used = (message, data) => ({
	statusCode: 226,
	error: false,
	message: message,
	data: data
})

// REDIRECTION RESPONSE
exports.redirection_multiple_choices = (message, data) => ({
	statusCode: 300,
	error: false,
	message: message,
	data: data
})

exports.redirection_moved_permanently = (message, data) => ({
	statusCode: 301,
	error: false,
	message: message,
	data: data
})

exports.redirection_found = (message, data) => ({
	statusCode: 302,
	error: false,
	message: message,
	data: data
})

exports.redirection_see_other = (message, data) => ({
	statusCode: 303,
	error: false,
	message: message,
	data: data
})

// CLIENT ERROR RESPONSE - 4XX
exports.client_error_bad_request = (message) => ({
	statusCode: 400,
	error: true,
	message: message
})

exports.client_error_unauthorized = (message) => ({
	statusCode: 401,
	error: true,
	message: message
})

exports.client_error_forbidden = (message) => ({
	statusCode: 403,
	error: true,
	message: message
})

exports.client_error_not_found = (message) => ({
	statusCode: 404,
	error: true,
	message: message
})

exports.client_error_not_allowed = (message) => ({
	statusCode: 405,
	error: true,
	message: message
})

exports.client_error_not_acceptable = (message) => ({
	statusCode: 406,
	error: true,
	message: message
})

exports.client_error_request_timeout = (message) => ({
	statusCode: 408,
	error: true,
	message: message
})

exports.client_error_conflict = (message) => ({
	statusCode: 409,
	error: true,
	message: message
})

// SERVER ERROR RESPONSE - 5XX
exports.server_error_internal = (message) => ({
	statusCode: 500,
	error: true,
	message: message
})

exports.server_error_not_implemented = (message) => ({
	statusCode: 501,
	error: true,
	message: message
})