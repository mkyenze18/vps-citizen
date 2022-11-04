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
	Report.append(Paragraph('<b><h1>NATIONAL POLICE SERVICE</h1></b>', styles["Center"]))
	Report.append(Image(os.path.join(settings.BASE_DIR, 'vps', 'rest_api', 'v0', 'OBReport', 'npc.png'), 1*inch, 1*inch))
	Report.append(Paragraph('<b>THE KENYA POLICE SERVICE</b>', styles["Center"]))
	Report.append(Spacer(1, 12))

	Report.append(Paragraph('<b>REPORT OCCURENCE FROM POLICE RECORDS</b>', styles["Left"]))
	Report.append(Spacer(1, 12))    
	# FULL_LENGTH_CHARACTER_COUNT = 130
	reporters = resource.reporters.all()
	for reporter in reporters:
		name = reporter.iprs_person.get_full_name()
		# for space in range(FULL_LENGTH_CHARACTER_COUNT - len(name)):
			# name += '&nbsp'

		biodata = {
			'name': f'<u>{name}</u>',    
		# 'county of': reporter.county_of_residence,    'email address': reporter.email_address,        
		# 	'sub-county': reporter.sub_county_of_residence,
		# 	'phone number': reporter.phone_number,
		}

		for key, value in biodata.items():
			Report.append(Paragraph(f' {key.upper()} : {value}'))
			Report.append(Spacer(1, 20))
		# Report.append(Paragraph(f"<b>Name :</b> {reporter.name}", styles["Left"]))
		Report.append(Paragraph(f' COUNTY OF: &nbsp&nbsp <u>{reporter.county_of_residence} ' '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</u>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' f' EMAIL ADDRESS : &nbsp&nbsp <u>{reporter.email_address} &nbsp&nbsp</u>', styles["Left"]))
		Report.append(Spacer(1, 20))
		Report.append(Paragraph(f' SUB COUNTY: &nbsp&nbsp<u> {reporter.sub_county_of_residence}' '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</u>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' f' PHONE NUMBER: &nbsp&nbsp<u>{reporter.phone_number}&nbsp&nbsp</u>', styles["Left"]))
		Report.append(Spacer(1, 20))

	Report.append(Paragraph(f' OCCURRENCE WAS REPORTED AT: &nbsp&nbsp<u> {resource.location}' '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</u>' ))
	Report.append(Spacer(1, 20))
	Report.append(Paragraph(f' POLICE STATION: &nbsp&nbsp<u> {resource.police_station.name}, {resource.police_station.location}</u>'))
	Report.append(Spacer(1, 20))

	# details = resource.details.get()
	details = resource.details.all()

	for detail in details:
		# Report.append(Paragraph(f"<b>INVOLVING:</b> {details.details['entryOne']}", styles["Left"]))
		Report.append(Paragraph(f" INVOLVING:  &nbsp&nbsp<u>{detail.category.name}&nbsp&nbsp</u>", styles["Left"]))
		Report.append(Spacer(1, 5))
		Report.append(Paragraph(f' NARATIVE : <u>{resource.narrative}</u>'))
		Report.append(Spacer(1, 20))
		


		# Report.append(Paragraph('<b>DETAILS</b>', styles["Left"]))
		# Report.append(Paragraph(f'<u>{detail.details}</u>'))
		# Report.append(Paragraph(f'<div><br></br><br></br></div>'))
		# # Report.append(Paragraph(str(detail.details), styles["Left"]))

		Report.append(Paragraph(' DETAILS ', styles["Left"]))
		Report.append(Spacer(1, 5))
		# Report.append(Paragraph(f'<u>{detail.details}</u>'))
		for name in detail.details:
			formated_name = name.replace('_', ' ').title()
			Report.append(Paragraph(f' {formated_name}  <u>{detail.details[name]}</u>'))
			Report.append(Paragraph(f'<div><br></br></div>'))
		Report.append(Paragraph(f'<div><br></br><br></br></div>'))

	Report.append(Spacer(1, 50))

	Report.append(Paragraph(f' DATE: &nbsp&nbsp<u> {datetime.now().strftime("%a %d %B, %Y  %X")}' '<div>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div></u>&nbsp&nbsp&nbsp' f' OB NUMBER : &nbsp&nbsp<u>{resource.ob_no}&nbsp&nbsp&nbsp</u>'))
	Report.append(Spacer(1, 30))

	# Report.append(Spacer(1, 12))
	full_name = police_officer.iprs_person.get_full_name()
	Report.append(Paragraph(f' OFFICER NAME:  &nbsp&nbsp<u>{full_name}&nbsp&nbsp&nbsp&nbsp</u>'))
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
	canvas.drawString(4 * inch, 1 * inch, 'VALID')
	canvas.restoreState()
