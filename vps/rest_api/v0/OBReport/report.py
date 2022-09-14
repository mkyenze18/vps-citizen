import io, os
from datetime import datetime
import qrcode
from django.conf import settings

from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import Color

def generate_report(file_name, resource, police_officer, url, **kwargs):
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
	Report.append(Image(os.path.join(settings.BASE_DIR, 'vps', 'rest_api', 'v0', 'OBReport', 'npc.png'), 1*inch, 1*inch))
	Report.append(Paragraph('<b>THE KENYA POLICE SERVICE</b>', styles["Center"]))
	Report.append(Spacer(1, 12))

	Report.append(Paragraph('<b>REPORT OCCURENCE FROM POLICE RECORDS</b>', styles["Left"]))
	Report.append(Spacer(1, 12))    

	reporter = resource.reporters.get()
	biodata = {
		'name': 'reporter.name',    'county': reporter.county_of_residence,    'email': reporter.email_address,        
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
		Report.append(Paragraph(str(detail.details), styles["Left"]))

	Report.append(Spacer(1, 12))

	Report.append(Paragraph(f'<b>DATE:</b> {datetime.now().strftime("%a %d %B, %Y  %X")}' '<div>&nbsp&nbsp&nbsp&nbsp</div>' f'<b>OB NUMBER</b>: {resource.ob_no}'))
	Report.append(Spacer(1, 12))

	# Report.append(Spacer(1, 12))
	full_name = police_officer.iprs_person.get_full_name()
	Report.append(Paragraph(f'<b>OFFICER NAME:</b> {full_name}'))
	# Report.append(Spacer(1, 20))
	# Report.append(Paragraph(f'<b>OFFICER SIGNATURE:</b> <u>{office_signature}</u>'))

	if kwargs.get('watermark'):
		# No need to have qr code on this document
		doc.build(Report, onFirstPage=AddWaterMark, onLaterPages=AddWaterMark)
	else:
		img = qrcode.make(url)
		buffer = io.BytesIO() # Create file in memory
		img.save(buffer, 'jpeg') # Save in file in memory - it has to be 'jpeg' not 'jpg'
		buffer.seek(0) # Move to the beginning of file
		Report.append(Image(buffer, 1.5*inch, 1.5*inch)) # Use image in memory
		doc.build(Report)
		buffer.close()

def AddWaterMark(canvas, doc):
	canvas.saveState()
	canvas.setFont('Times-Bold', 160)
	canvas.setFillColor(Color(255, 0, 0, alpha = 0.5))
	canvas.rotate(45)
	canvas.drawString(5 * inch, 1 * inch, 'VALID')
	canvas.restoreState()
