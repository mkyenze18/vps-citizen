from datetime import datetime
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def generate_report(file_name, resource, police_officer):
	doc = SimpleDocTemplate(
			file_name,
			pagesize = A4,
			rightMargin = 72,
			leftMargin = 72,
			topMargin = 72,
			bottomMargin = 18
		)

	styles=getSampleStyleSheet()
	styles.add(ParagraphStyle(name='Justify', alignment=TA_JUSTIFY))
	styles.add(ParagraphStyle(name='Center', alignment=TA_CENTER))
	styles.add(ParagraphStyle(name='Left', alignment=TA_LEFT))

	Report=[]
	Report.append(Paragraph('<b>NATIONAL POLICE SERVICE</b>', styles["Center"]))
	Report.append(Image("/tmp/npc.png", 1*inch, 1*inch))
	Report.append(Paragraph('<b>THE KENYA POLICE SERVICE</b>', styles["Center"]))
	Report.append(Spacer(1, 12))

	Report.append(Paragraph('<b>REPORT OCCURENCE FROM POLICE RECORDS</b>', styles["Left"]))
	Report.append(Spacer(1, 12))

	Report.append(Paragraph(f'<b>OB NUMBER</b>: {resource.ob_no}'))
	Report.append(Spacer(1, 12))

	reporter = resource.reporters.get()
	biodata = {
		'name': 'reporter.name',
		'email': reporter.email_address,
		'county': reporter.county_of_residence,
		'sub-county': reporter.sub_county_of_residence,
		'phone': reporter.phone_number,
	}

	for key, value in biodata.items():
		Report.append(Paragraph(f'<b>{key.upper()}</b>: {value}'))
		Report.append(Spacer(1, 4))

	Report.append(Paragraph(f'<b>OCCURRENCE WAS REPORTED AT:</b> {resource.location}'))
	Report.append(Paragraph(f'<b>POLICE STATION:</b> {resource.police_station.name}, {resource.police_station.location}'))
	Report.append(Spacer(1, 12))

	# details = resource.details.get()
	details = resource.details.all()

	for detail in details:
		# Report.append(Paragraph(f"<b>INVOLVING:</b> {details.details['entryOne']}", styles["Left"]))
		Report.append(Paragraph(f"<b>INVOLVING:</b> {detail.category.name}", styles["Left"]))
		Report.append(Spacer(1, 12))


		# Report.append(Paragraph('<b>{} DETAILS</b>'.format(detail.category.name).upper(), styles["Left"]))
		# for key, value in details.details['entryTwo'].items():
		# 	Report.append(Paragraph(f"<b>{' '.join(key.split('_')).title()}:</b> {value}", styles["Left"]))

		Report.append(Paragraph('<b>DETAILS</b>', styles["Left"]))
		for key, value in detail.details.items():
			Report.append(Paragraph(f"<b>{' '.join(key.split('_')).title()}:</b> {value}", styles["Left"]))

	Report.append(Spacer(1, 12))

	Report.append(Paragraph(f'<b>DATE:</b> {datetime.now().strftime("%a %d %B, %Y  %X")}'))
	Report.append(Spacer(1, 12))
	# full_name = "{} {}".format(police_officer.first_name.title(), police_officer.last_name.title())
	# full_name = police_officer.iprs_person.str()
	full_name = police_officer.iprs_person.get_full_name()
	Report.append(Paragraph(f'<b>OFFICER NAME:</b> {full_name}'))
	# Report.append(Spacer(1, 20))
	# Report.append(Paragraph(f'<b>OFFICER SIGNATURE:</b> <u>{office_signature}</u>'))
	doc.build(Report)