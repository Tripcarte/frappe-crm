// frappe.pages['schedule'].on_page_load = function(wrapper) {
//     let page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Schedule',
//         single_column: true
//     });

//     page.add_field({
//         label: 'Date',
//         fieldtype: 'Date',
//         fieldname: 'filter_date',
//         default: frappe.datetime.get_today(),
//         change() {
//             load_data();
//         }
//     });

//     page.add_field({
//         label: 'Package',
//         fieldtype: 'Link',
//         options: 'Package',
//         fieldname: 'filter_package',
//         change() {
//             load_data();
//         }
//     });

//     $(frappe.render_template("schedule", {})).appendTo(page.body);

//     function load_data() {
//         const date = page.fields_dict.filter_date.get_value();
//         const package = page.fields_dict.filter_package.get_value();

//         frappe.call({
//             method: "cruise_crm.crm.page.schedule.schedule.get_booking_data",
//             args: {
//                 date,
//                 package
//             },
//             callback: function(r) {
//                 const bookings = r.message;
//                 render_bookings(bookings);
//             }
//         });
//     }

//     function render_bookings(bookings) {
//         const container = $('#schedule-container');
//         container.empty();

//         if (!bookings.length) {
//             container.append('<p>No bookings found.</p>');
//             return;
//         }

//         const grouped = groupBy(bookings, 'booking_date');
//         for (let date in grouped) {
//             const group = grouped[date];
//             const html = `
//                 <div class="booking-date">
//                     <h4>${date} (${group.length} bookings)</h4>
//                     <ul>
//                         ${group.map(b => `<li><a href="#" data-name="${b.name}" class="booking-link">${b.booking_name} (${b.package})</a></li>`).join('')}
//                     </ul>
//                 </div>
//             `;
//             container.append(html);
//         }

//         $('.booking-link').on('click', function(e) {
//             e.preventDefault();
//             const name = $(this).data('name');
//             frappe.set_route('Form', 'Booking', name);
//         });
//     }

//     function groupBy(array, key) {
//         return array.reduce((result, current) => {
//             (result[current[key]] = result[current[key]] || []).push(current);
//             return result;
//         }, {});
//     }

//     load_data();
// };


// frappe.pages['schedule'].on_page_load = function(wrapper) {
//     let page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Booking Schedule',
//         single_column: true
//     });

//     page.add_field({
//         label: 'From Date',
//         fieldtype: 'Date',
//         fieldname: 'from_date',
//         default: frappe.datetime.get_today(),
//         change() {
//             load_data();
//         }
//     });

//     const default_to_date = frappe.datetime.add_days(frappe.datetime.get_today(), 6);

//     page.add_field({
//         label: 'To Date',
//         fieldtype: 'Date',
//         fieldname: 'to_date',
//         default: default_to_date,
//         change() {
//             load_data();
//         }
//     });

//     page.add_field({
//         label: 'Package',
//         fieldtype: 'Link',
//         options: 'Package',
//         fieldname: 'filter_package',
//         change() {
//             load_data();
//         }
//     });

//     $(frappe.render_template("schedule", {})).appendTo(page.body);

//     function load_data() {
//         const from_date = page.fields_dict.from_date.get_value();
//         const to_date = page.fields_dict.to_date.get_value();
//         const package = page.fields_dict.filter_package.get_value();

//         frappe.call({
//             method: "cruise_crm.crm.page.schedule.schedule.get_booking_data",
//             args: {
//                 from_date,
//                 to_date,
//                 package
//             },
//             callback: function(r) {
//                 const bookings = r.message;
//                 render_bookings(bookings);
//             }
//         });
//     }

//     function render_bookings(bookings) {
//         const container = $('#schedule-container');
//         container.empty();

//         if (!bookings.length) {
//             container.append('<p>No bookings found.</p>');
//             return;
//         }

//         const grouped_by_date = groupBy(bookings, 'booking_date');

//         for (let date in grouped_by_date) {
//             const packages = groupBy(grouped_by_date[date], 'package');
//             let date_html = `<div class="booking-date">
//                 <h4>${date}</h4>
//             `;

//             for (let pkg in packages) {
//                 const package_group = packages[pkg];
//                 date_html += `
//                     <details class="booking-package">
//                         <summary>${pkg} (${package_group.length} bookings)</summary>
//                         <ul>
//                             ${package_group.map(b => `<li><a href="#" data-name="${b.name}" class="booking-link">${b.name} (${b.package})</a></li>`).join('')}
//                         </ul>
//                     </details>
//                 `;
//             }

//             date_html += '</div>';
//             container.append(date_html);
//         }

//         $('.booking-link').on('click', function(e) {
//             e.preventDefault();
//             const name = $(this).data('name');
//             frappe.set_route('Form', 'Booking', name);
//         });
//     }

//     function groupBy(array, key) {
//         return array.reduce((result, current) => {
//             (result[current[key]] = result[current[key]] || []).push(current);
//             return result;
//         }, {});
//     }

//     load_data();
// };

frappe.pages['schedule'].on_page_load = function(wrapper) {
    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Schedules',
        single_column: true
    });

    page.add_field({
        label: 'From Date',
        fieldtype: 'Date',
        fieldname: 'from_date',
        default: frappe.datetime.get_today(),
        change() {
            load_data();
        }
    });

    const default_to_date = frappe.datetime.add_days(frappe.datetime.get_today(), 6);

    page.add_field({
        label: 'To Date',
        fieldtype: 'Date',
        fieldname: 'to_date',
        default: default_to_date,
        change() {
            load_data();
        }
    });

    page.add_field({
        label: 'Package',
        fieldtype: 'Link',
        options: 'Package',
        fieldname: 'filter_package',
        change() {
            load_data();
        }
    });

    $('<div id="schedule-container" style="padding: 1rem;"></div>').appendTo(page.body);

    function load_data() {
        const from_date = page.fields_dict.from_date.get_value();
        const to_date = page.fields_dict.to_date.get_value();
        const package = page.fields_dict.filter_package.get_value();

        frappe.call({
            method: "cruise_crm.crm.page.schedule.schedule.get_booking_data",
            args: {
                from_date,
                to_date,
                package
            },
            callback: function(r) {
                const bookings = r.message;
                render_bookings(bookings);
            }
        });
    }

    function render_bookings(bookings) {
        const container = $('#schedule-container');
        container.empty();

        if (!bookings.length) {
            container.append('<p>No bookings found.</p>');
            return;
        }

        const grouped_by_date = groupBy(bookings, 'booking_date');

        for (let date in grouped_by_date) {
            const packages = groupBy(grouped_by_date[date], 'package');
            let date_html = `<div class="booking-date" style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.75rem;">${formatDate(date)}</h4>
            `;

            for (let pkg in packages) {
                const package_group = packages[pkg];
                date_html += `
					<details class="booking-package" style="margin-bottom: 1rem;" open>
						<summary style="cursor: pointer; font-weight: 600; padding: 0.5rem 0; font-size: 1.1rem;"">
							${package_group[0].package_name || pkg} (${package_group.length} booking${package_group.length === 1 ? '' : 's'})
						</summary>
						<div style="overflow-x: auto;">
							<table class="table table-bordered" style="width: 100%; border-collapse: collapse;">
								<thead style="background: #f9f9f9; position: sticky; top: 0; z-index: 1;">
									<tr>
										<th style="width: 10%; padding: 0.5rem; border: 1px solid #ddd;">Booking ID</th>
										<th style="padding: 0.5rem; border: 1px solid #ddd;">Booking Name</th>
										<th style="padding: 0.5rem; border: 1px solid #ddd;">Email</th>
										<th style="width: 10%; padding: 0.5rem; border: 1px solid #ddd;">Contact No</th>
										<th style="width: 15%; padding: 0.5rem; border: 1px solid #ddd;">Package</th>
										<th style="width: 10%; padding: 0.5rem; border: 1px solid #ddd;">Status</th>
										<th style="width: 5%; padding: 0.5rem; border: 1px solid #ddd;">Qty</th>
									</tr>
								</thead>
								<tbody>
									${package_group.map(b => `
										<tr>
											<td style="width: 10%; padding: 0.5rem; border: 1px solid #ddd;">
												<a href="#" data-name="${b.name}" class="booking-link">${b.name}</a>
											</td>
											<td style="padding: 0.5rem; border: 1px solid #ddd;">${b.booking_name || '-'}</td>
											<td style="padding: 0.5rem; border: 1px solid #ddd;">${b.email || '-'}</td>
											<td style="width: 10%; padding: 0.5rem; border: 1px solid #ddd;">${(b.contact_number || '-').replace(/-/g, '')}</td>
											<td style="width: 15%; padding: 0.5rem; border: 1px solid #ddd;">${b.package_name || b.package || '-'}</td>
											<td style="width: 10%; padding: 0.5rem; border: 1px solid #ddd;">${b.status || '-'}</td>
											<td style="width: 5%; padding: 0.5rem; border: 1px solid #ddd;">${b.participants}</td>
										</tr>
									`).join('')}
								</tbody>
							</table>
						</div>
					</details>
				`;
            }

            date_html += '</div>';
            container.append(date_html);
        }

        $('.booking-link').on('click', function(e) {
            e.preventDefault();
            const name = $(this).data('name');
            frappe.set_route('Form', 'Booking', name);
        });
    }

	function formatDate(dateStr) {
		const date = new Date(dateStr);
		return new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		}).format(date); // Output: "14 May 2025"
	}

    function groupBy(array, key) {
        return array.reduce((result, current) => {
            (result[current[key]] = result[current[key]] || []).push(current);
            return result;
        }, {});
    }

    load_data();
};