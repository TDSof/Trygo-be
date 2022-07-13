class TourGuide {
	constructor(user) {
		this.tour_guide_id = user.tour_guide_id;
		this.tour_guide_full_name = user.tour_guide_full_name;
		this.tour_guide_email = user.tour_guide_email?.toLowerCase();
		this.tour_guide_password = user.tour_guide_password;
		this.tour_guide_created_at = user.tour_guide_created_at;
	}
}

module.exports = TourGuide;