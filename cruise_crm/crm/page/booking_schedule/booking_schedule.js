frappe.pages['grouped-booking-booking_schedule'].on_page_load= function(wrapper) {
        let page = frappe.ui.make_app_page({
            parent: wrapper,
            title: 'Booking Schedule',
            single_column: true
        });

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Booking',
                fields: ['name', 'status', 'resource', 'booking_date'],
                limit_page_length: 1000
            },
            callback: function(response) {
                const bookings = response.message || [];
                const grouped = {};

                bookings.forEach(b => {
                    const key = b.status || 'No Status';
                    if (!grouped[key]) grouped[key] = [];
                    grouped[key].push(b);
                });

                const container = $('<div class="grouped-list p-4"></div>').appendTo(page.body);

                for (const status in grouped) {
                    container.append(`<h4>${status}</h4><ul class="list-disc ml-4 mb-4"></ul>`);
                    const list = container.find('ul').last();
                    grouped[status].forEach(b => {
                        list.append(`<li><a href="/app/booking/${b.name}">${b.name}</a> — ${b.resource} (${b.booking_date})</li>`);
                    });
                }
            }
        });
};
