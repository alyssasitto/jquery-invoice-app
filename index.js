$(".sun-icon").click(() => {
	localStorage.setItem("background-state", "");
	$("body").removeClass("dark");
});

$(".moon-icon").click(() => {
	localStorage.setItem("background-state", "dark");
	$("body").addClass(localStorage.getItem("background-state"));
});

$("body").addClass(localStorage.getItem("background-state"));

$(".new-btn").click((e) => {});

$.getJSON("data.json", (data) => {
	if (!localStorage.getItem("data")) {
		localStorage.setItem("data", JSON.stringify(data));
	}

	const storedData = JSON.parse(localStorage.getItem("data"));

	if (!storedData) {
		$(".no-invoices").addClass("show-no-invoices");
	}

	if (storedData && storedData.length > 0) {
		$(".num-invoices").html(`${storedData.length} invoices`);

		$.each(storedData, (i, item) => {
			console.log(item);

			$(".invoices").append(`
		<div class="invoice ${item.id}">

			<div>
				<p>#<span class=bold>${item.id}</span></p>
				<p class=name>${item.clientName}</p>
			</div>

			<div>
				<div>
					<p class=due-date>Due ${item.paymentDue}</p>
					<p class=total>$ ${item.total.toLocaleString()}</p>
				</div>
			<p class=${item.status}>${item.status}</p>
			</div>
		
		</div>`);
		});
	}

	$(".invoice").click(function () {
		const id = $(this).attr("class").split(" ")[1];
		localStorage.setItem("invoice", id);
		console.log(id);

		$(window.location).prop("href", "invoice-details.html");
	});
});

////////////////////////////////////////////////////////////////////////////////

// Invoice details page js

// Back button functionality
$(".back-btn").click(() => {
	history.back();
});

const data = JSON.parse(localStorage.getItem("data"));
const id = localStorage.getItem("invoice");

const invoice = data.filter((el) => {
	if (id === el.id) {
		return el;
	}
});

$(".status-container").append(
	`<p class=${invoice[0].status}>${invoice[0].status}</p>`
);

$(".invoice-header").append(`
<div class=margin-helper>
	<p><span class=grey>#</span><span class=bold>${invoice[0].id}</span></p>
	<p class=grey>${invoice[0].description}</p>
</div>`);

$(".invoice-header").append(`
<div class="address grey margin-helper">
	<p>${invoice[0].senderAddress.street}</p>
	<p>${invoice[0].senderAddress.city}</p>
	<p>${invoice[0].senderAddress.postCode}</p>
	<p>${invoice[0].senderAddress.country}</p>
</div>`);

$(".invoice-date").append(`<p class=bold>${invoice[0].createdAt}</p>`);

$(".payment-date").append(`<p class=bold>${invoice[0].paymentDue}</p>`);

$(".bill-to").append(`
<p class="client-name bold">${invoice[0].clientName}</p>
<div class="address grey margin-helper">
	<p>${invoice[0].clientAddress.street}</p>
	<p>${invoice[0].clientAddress.city}</p>
	<p>${invoice[0].clientAddress.postCode}</p>
	<p>${invoice[0].clientAddress.country}</p>
</div>
`);

$(".sent-to").append(`<p class=bold>${invoice[0].clientEmail}</p>`);

$.each(invoice[0].items, (i, item) => {
	$(".purchased-items").append(`<div class=purchase>
	<div>
	 <p class="bold item">${item.name}</p>
	 <p class=grey>${item.quantity} x $${item.price.toLocaleString()}</p>
	</div>

	 <p class=bold>$${item.total.toLocaleString()}</p>
	</div>`);
});

$(".purchased-items").append(`
  <div class=amount-due>
	 <p>Amount Due</p>
	 <p class="bold final-total">$${invoice[0].total.toLocaleString()}</p>
  </div>`);

/////////////////////////////////////////////////////////////////////////////////////

// Edit invoice page js

// Edit button functionality
$(".edit").click(() => {
	$(window.location).prop("href", "edit-invoice.html");
});

$(".form-container h1").html(`Edit <span class=grey>#</span>${invoice[0].id}`);

const senderStreet = $(".edit-form input[name=street-address]");
const senderCity = $(".edit-form input[name=city]");
const senderPostCode = $(".edit-form input[name=post-code]");
const senderCountry = $(".edit-form select[name=country]").val();

const clientName = $(".edit-form input[name=client-name]");
const clientEmail = $(".edit-form input[name=client-email]");
const clientStreet = $(".edit-form input[name=client-street]");
const clientCity = $(".edit-form input[name=client-city]");
const clientPostCode = $(".edit-form input[name=client-post-code]");
const clientCountry = $(".edit-form select[name=client-country]");

const paymentTerms = $(".edit-form input[name=payment-terms]");
const description = $(".edit-form input[name=description]");
const date = $(".edit-form input[name=date]");

// Set sender street
senderStreet.attr({
	placeholder: invoice[0].senderAddress.street,
	value: invoice[0].senderAddress.street,
});

// Set sender city
senderCity.attr({
	placeholder: invoice[0].senderAddress.city,
	value: invoice[0].senderAddress.city,
});

// Set sender post code
senderPostCode.attr({
	placeholder: invoice[0].senderAddress.postCode,
	value: invoice[0].senderAddress.postCode,
});

// Set sender country
$(
	`.edit-form select[name=country] option[value="${invoice[0].senderAddress.country}"]`
).prop("selected", true);

// Set client name
clientName.attr({
	placeholder: invoice[0].clientName,
	value: invoice[0].clientName,
});

// Set client email
clientEmail.attr({
	placeholder: invoice[0].clientEmail,
	value: invoice[0].clientEmail,
});

// Set client street
clientStreet.attr({
	placeholder: invoice[0].clientAddress.street,
	value: invoice[0].clientAddress.street,
});

// Set client city
clientCity.attr({
	placeholder: invoice[0].clientAddress.city,
	value: invoice[0].clientAddress.city,
});

// Set client post code
clientPostCode.attr({
	placeholder: invoice[0].clientAddress.postCode,
	value: invoice[0].clientAddress.postCode,
});

// Set client country default
$(
	`.edit-form select[name=client-country] option[value="${invoice[0].clientAddress.country}"]`
).attr("selected", true);

// Set payment terms
paymentTerms.attr({
	placeholder: `Net ${invoice[0].paymentTerms} Days`,
	value: `Net ${invoice[0].paymentTerms} Days`,
});

// Set product description
description.attr({
	placeholder: invoice[0].description,
	value: invoice[0].description,
});

// Set date
date.attr({
	value: invoice[0].createdAt,
});

// Make item divs
$.each(invoice[0].items, (i, item) => {
	$(".items").append(`<div class=item-container>
	<div class=input>
	<label for=item-name>Item Name</label>
	<input type=text name=item-name placeholder="${item.name}"/>
	</div>

	<div class=item-flex>
	<div class=input>
<label for=qty>Qty.</label>
<input type=number name=qty placeholder="${item.quantity}" />
	</div>

	<div class=input>
	<label for=price>Price</label>
	<input type=number name=price placeholder="${item.price.toLocaleString()}"/>
	</div>

	<div class=input>
	<label for=item-total>Total</label>
	<input type=number class=input-helper name=item-total placeholder="${item.total.toLocaleString()}"/>
	</div>

	<button class=delete-item><img src=assets/icon-delete.svg></img></button>
	</div>
	</div>`);
});

// Cancel button functionality
$(".cancel-btn").click((e) => {
	e.preventDefault();
	history.back();
});

// Save changes button functionlity
$(".save-btn").click((e) => {
	e.preventDefault();

	const newInvoice = {
		clientAddress: {
			city: clientCity.val(),
			country: clientCountry.val(),
			postCode: clientPostCode.val(),
			street: clientStreet.val(),
		},
		clientEmail: clientEmail.val(),
		clientName: clientName.val(),
		createdAt: date.val(),
		description: description.val(),
		id: invoice[0].id,
		items: invoice[0].items,
		paymentDue: invoice[0].paymentDue,
		paymentTerms: paymentTerms.val(),
		senderAddress: {
			city: senderCity.val(),
			country: senderCountry,
			postCode: senderPostCode.val(),
			street: senderStreet.val(),
		},
		status: invoice[0].status,
		total: invoice[0].total,
	};

	const invoices = JSON.parse(localStorage.getItem("data"));

	let index;

	$.each(invoices, (i, item) => {
		if (item.id === invoice[0].id) {
			index = i;
		}
	});

	invoices.splice(index, 1, newInvoice);

	localStorage.setItem("data", JSON.stringify(invoices));
});

// Delete item functionality

$(".delete-item").click((e) => {
	e.preventDefault();
	console.log("hi");
});
