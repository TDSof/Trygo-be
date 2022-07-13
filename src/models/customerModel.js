class Customer {
	// public customer_id?: number;
	// public customer_full_name: string;
	// public customer_email: string;
	// public customer_password: string;
	// public customer_created_at?: string;

	constructor(user) {
		this.customer_id = user.customer_id;
		this.customer_full_name = user.customer_full_name;
		this.customer_email = user.customer_email?.toLowerCase();
		this.customer_password = user.customer_password;
		this.customer_created_at = user.customer_created_at;
	}
}

module.exports = Customer;