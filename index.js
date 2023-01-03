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
	localStorage.setItem("data", JSON.stringify(data));

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

// Set sender street placeholder
$(".edit-form input[name=street-address]").attr(
	"placeholder",
	invoice[0].senderAddress.street
);

// Set sender city placeholder
$(".edit-form input[name=city]").attr(
	"placeholder",
	invoice[0].senderAddress.city
);

// Set sender post code placeholder
$(".edit-form input[name=post-code]").attr(
	"placeholder",
	invoice[0].senderAddress.postCode
);

// Set sender country placeholder
$(
	`.edit-form select[name=country] option[value="${invoice[0].senderAddress.country}"]`
).prop("selected", true);

// Set client name placeholder
$(".edit-form input[name=client-name]").attr(
	"placeholder",
	invoice[0].clientName
);

// Set client email placeholder
$(".edit-form input[name=client-email]").attr(
	"placeholder",
	invoice[0].clientEmail
);

// Set client street placeholder
$(".edit-form input[name=client-street]").attr(
	"placeholder",
	invoice[0].clientAddress.street
);

// Set client city placeholder
$(".edit-form input[name=client-city]").attr(
	"placeholder",
	invoice[0].clientAddress.city
);

// Set client post code placeholder
$(".edit-form input[name=client-post-code]").attr(
	"placeholder",
	invoice[0].clientAddress.postCode
);

// Set client country placeholder
$(
	`.edit-form select[name=client-country] option[value="${invoice[0].clientAddress.country}"]`
).prop("selected", true);

// Set payment terms
$(".edit-form input[name=payment-terms]").attr(
	"placeholder",
	`Net ${invoice[0].paymentTerms} Days`
);

// Set product description placeholder
$(".edit-form input[name=description]").attr(
	"placeholder",
	invoice[0].description
);
