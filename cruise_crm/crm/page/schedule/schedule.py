import frappe

@frappe.whitelist()
def get_booking_data(from_date=None, to_date=None, package=None):
    filters = {}
    if from_date and to_date:
        filters["booking_date"] = ["between", [from_date, to_date]]
    elif from_date:
        filters["booking_date"] = [">=", from_date]
    elif to_date:
        filters["booking_date"] = ["<=", to_date]

    if package:
        filters["package"] = package

    bookings = frappe.get_all("Booking",
        filters=filters,
        fields=[
            "name", "booking_name", "booking_date", "package",
            "email", "contact_number", "status"
        ],
        order_by="booking_date asc"
    )

    # Get all unique package IDs
    package_ids = list(set(b["package"] for b in bookings if b.get("package")))
    package_names = {}

    if package_ids:
        package_names = {
            p.name: p.package_name
            for p in frappe.get_all("Package", filters={"name": ["in", package_ids]}, fields=["name", "package_name"])
        }

    # Count participants for each booking
    for b in bookings:
        b["package_name"] = package_names.get(b["package"], b["package"])
        b["participants"] = frappe.db.count("Booking Participant", {"parent": b["name"]})

    return bookings