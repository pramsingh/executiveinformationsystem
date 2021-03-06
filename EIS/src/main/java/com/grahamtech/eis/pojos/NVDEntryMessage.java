package com.grahamtech.eis.pojos;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.DateSerializer;
import com.grahamtech.eis.utilities.ConstantsUtil;
import com.grahamtech.eis.utilities.StringUtil;

/*
 * Represents one RSS entry message
 */

@Entity
@Table(name = "nvd_entry_message")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Access(AccessType.FIELD)
public class NVDEntryMessage extends RiskMetrics implements
    java.io.Serializable {

  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "entry_message_id")
  private long entry_message_id;
  @Column(name = "cve_id", unique = true)
  private String cve_id = ""; // cve-id
  @Column(name = "source")
  private String source;

  @Column(name = "generated_on_date", columnDefinition = "DATETIME")
  @Temporal(TemporalType.TIMESTAMP)
  @JsonSerialize(using = DateSerializer.class)
  private Date generated_on_date; // generated-on-datetime
  @Column(name = "published_date", columnDefinition = "DATETIME")
  @Temporal(TemporalType.TIMESTAMP)
  @JsonSerialize(using = DateSerializer.class)
  private Date published_date; // published-datetime

  @OneToMany(mappedBy = "nvdEntryMessageAttribute", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JsonManagedReference
  private Set<NVDEntryVulnerableSoftware> vulnerability_software_list =
      new HashSet<NVDEntryVulnerableSoftware>(); // product

  @ManyToOne(optional = false)
  @JoinColumn(name = "system_id_fk")
  @JsonBackReference
  private ProjectSystem nvdEntrySystemAttribute;

  @ManyToOne
  @JoinColumn(name = "flagged_by_fk_nvd")
  @JsonBackReference
  private FlaggedAsset flaggedAsset;

  public NVDEntryMessage() {
  }

  @Override
  public String toString() {
    return "Feed [cve_id= "
        + cve_id
        + ", score= "
        + this.getScore()
        + ", access_vector="
        + this.getAccess_vector()
        + ", access_complexity= "
        + this.getAccess_complexity()
        + ", authentication= "
        + this.getAuthentication()
        + ", confidentiality_impact= "
        + this.getConfidentiality_impact()
        + ", integrity_impact= "
        + this.getIntegrity_impact()
        + ", availability_impact= "
        + this.getAvailability_impact()
        + ", source= "
        + this.getSource()
        + ", generated_on_date= "
        + ((this.getGenerated_on_date() == null) ? "N/A" : this
            .getGenerated_on_date_String())
        + ", pub_date= "
        + ((this.getPublished_date() == null) ? "N/A" : this
            .getPublished_date_String())
        + ", last_mod_date= "
        + ((this.getLast_modified_date() == null) ? "N/A" : this
            .getLast_modified_date_String())
        + ", project_system_name="
        + ((this.getNvdEntrySystemAttribute().getSystem_name() == null) ? "N/A"
            : this.getNvdEntrySystemAttribute().getSystem_name())
        + ", flagged_reason="
        + ((this.getFlaggedAsset().getFlagged_reason() == null) ? "N/A" : this
            .getFlaggedAsset().getFlagged_reason()) + ", summary= "
        + this.getSummary() + ", product list= " + getSoftwareListToString()
        + "]";
  }

  public String getSoftwareListToString() {
    StringBuffer strBuffer = new StringBuffer();
    int count = 0;
    for (NVDEntryVulnerableSoftware software : vulnerability_software_list) {
      if (count > 0) {
        strBuffer.append(", ");
      }
      strBuffer.append(software.getVulnerable_software_name());
      count++;
    }
    return strBuffer.toString();
  }
  
  public long getEntry_message_id() {
    return entry_message_id;
  }

  public void setEntry_message_id(long entry_message_id) {
    this.entry_message_id = entry_message_id;
  }

  public String getCve_id() {
    return cve_id;
  }

  public void setCve_id(String cve_id) {
    this.cve_id = cve_id;
  }

  public Set<NVDEntryVulnerableSoftware> getVulnerability_software_list() {
    return vulnerability_software_list;
  }

  // used in Hibernate foreign key insertion
  public void setVulnerability_software_list(
      Set<NVDEntryVulnerableSoftware> vulnerability_software_list) {
    for (NVDEntryVulnerableSoftware vs : vulnerability_software_list) {
      this.getVulnerability_software_list().add(vs);
      vs.setNvdEntryMessageAttribute(this);
    }
  }

  public static long getSerialversionuid() {
    return serialVersionUID;
  }

  public ProjectSystem getNvdEntrySystemAttribute() {
    if (nvdEntrySystemAttribute != null) {
      return nvdEntrySystemAttribute;
    }
    return new ProjectSystem();
  }

  public void setNvdEntrySystemAttribute(ProjectSystem nvdEntrySystemAttribute) {
    if (nvdEntrySystemAttribute != null) {
      this.nvdEntrySystemAttribute = nvdEntrySystemAttribute;
    }
    this.nvdEntrySystemAttribute = new ProjectSystem();
  }

  public FlaggedAsset getFlaggedAsset() {
    if (flaggedAsset != null) {
      return flaggedAsset;
    }
    return new FlaggedAsset();
  }

  public void setFlaggedAsset(FlaggedAsset flaggedAsset) {
    if (flaggedAsset != null) {
      this.flaggedAsset = flaggedAsset;
    }
    this.flaggedAsset = new FlaggedAsset();
  }

  public String getSource() {
    return source;
  }

  public void setSource(String source) {
    this.source = source;
  }

  public Date getGenerated_on_date() {
    return generated_on_date;
  }

  public void setGenerated_on_date(Date generated_on_date) {
    this.generated_on_date = generated_on_date;
  }

  public Date getPublished_date() {
    return published_date;
  }

  public void setPublished_date(Date published_date) {
    this.published_date = published_date;
  }

  public String getGenerated_on_date_String() {
    return StringUtil.dateToString(this.getGenerated_on_date(),
        ConstantsUtil.DATE_FORMAT);
  }

  public String getPublished_date_String() {
    return StringUtil.dateToString(this.getPublished_date(),
        ConstantsUtil.DATE_FORMAT);
  }

  public String getLast_modified_date_String() {
    return StringUtil.dateToString(this.getLast_modified_date(),
        ConstantsUtil.DATE_FORMAT);
  }
}

/*
 * <entry id="CVE-2015-0922"> <vuln:vulnerable-configuration
 * id="http://www.nist.gov/"> <cpe-lang:logical-test operator="OR"
 * negate="false"> <cpe-lang:fact-ref
 * name="cpe:/a:mcafee:epolicy_orchestrator:4.6.8"/> <cpe-lang:fact-ref
 * name="cpe:/a:mcafee:epolicy_orchestrator:5.0.0"/> <cpe-lang:fact-ref
 * name="cpe:/a:mcafee:epolicy_orchestrator:5.0.1"/> <cpe-lang:fact-ref
 * name="cpe:/a:mcafee:epolicy_orchestrator:5.1.0"/> <cpe-lang:fact-ref
 * name="cpe:/a:mcafee:epolicy_orchestrator:5.1.1"/> </cpe-lang:logical-test>
 * </vuln:vulnerable-configuration> <vuln:vulnerable-software-list>
 * <vuln:product>cpe:/a:mcafee:epolicy_orchestrator:4.6.8</vuln:product>
 * <vuln:product>cpe:/a:mcafee:epolicy_orchestrator:5.1.1</vuln:product>
 * <vuln:product>cpe:/a:mcafee:epolicy_orchestrator:5.1.0</vuln:product>
 * <vuln:product>cpe:/a:mcafee:epolicy_orchestrator:5.0.0</vuln:product>
 * <vuln:product>cpe:/a:mcafee:epolicy_orchestrator:5.0.1</vuln:product>
 * </vuln:vulnerable-software-list> <vuln:cve-id>CVE-2015-0922</vuln:cve-id>
 * <vuln
 * :published-datetime>2015-01-09T13:59:11.540-05:00</vuln:published-datetime>
 * <vuln
 * :last-modified-datetime>2015-02-11T14:14:22.023-05:00</vuln:last-modified
 * -datetime> <vuln:cvss> <cvss:base_metrics> <cvss:score>5.0</cvss:score>
 * <cvss:access-vector>NETWORK</cvss:access-vector>
 * <cvss:access-complexity>LOW</cvss:access-complexity>
 * <cvss:authentication>NONE</cvss:authentication>
 * <cvss:confidentiality-impact>PARTIAL</cvss:confidentiality-impact>
 * <cvss:integrity-impact>NONE</cvss:integrity-impact>
 * <cvss:availability-impact>NONE</cvss:availability-impact>
 * <cvss:source>http://nvd.nist.gov</cvss:source>
 * <cvss:generated-on-datetime>2015
 * -02-10T15:46:33.633-05:00</cvss:generated-on-datetime> </cvss:base_metrics>
 * </vuln:cvss> <vuln:cwe id="CWE-200"/> <vuln:references xml:lang="en"
 * reference_type="VENDOR_ADVISORY"> <vuln:source>CONFIRM</vuln:source>
 * <vuln:reference
 * href="https://kc.mcafee.com/corporate/index?page=content&amp;id=SB10095"
 * xml:lang
 * ="en">https://kc.mcafee.com/corporate/index?page=content&amp;id=SB10095
 * </vuln:reference> </vuln:references> <vuln:references xml:lang="en"
 * reference_type="UNKNOWN"> <vuln:source>XF</vuln:source> <vuln:reference
 * href="http://xforce.iss.net/xforce/xfdb/99949"
 * xml:lang="en">macafee-cve20150922-info-disc(99949)</vuln:reference>
 * </vuln:references> <vuln:references xml:lang="en" reference_type="UNKNOWN">
 * <vuln:source>BID</vuln:source> <vuln:reference
 * href="http://www.securityfocus.com/bid/72298"
 * xml:lang="en">72298</vuln:reference> </vuln:references> <vuln:references
 * xml:lang="en" reference_type="UNKNOWN"> <vuln:source>FULLDISC</vuln:source>
 * <vuln:reference href="http://seclists.org/fulldisclosure/2015/Jan/8"
 * xml:lang="en">20150106 McAfee ePolicy Orchestrator Authenticated XXE and
 * Credential Exposure</vuln:reference> </vuln:references> <vuln:references
 * xml:lang="en" reference_type="UNKNOWN"> <vuln:source>FULLDISC</vuln:source>
 * <vuln:reference href="http://seclists.org/fulldisclosure/2015/Jan/37"
 * xml:lang="en">20150112 Re: McAfee ePolicy Orchestrator Authenticated XXE and
 * Credential Exposure</vuln:reference> </vuln:references> <vuln:references
 * xml:lang="en" reference_type="UNKNOWN"> <vuln:source>MISC</vuln:source>
 * <vuln:reference href=
 * "http://packetstormsecurity.com/files/129827/McAfee-ePolicy-Orchestrator-Authenticated-XXE-Credential-Exposure.html"
 * xml:lang="en">http://packetstormsecurity.com/files/129827/McAfee-ePolicy-
 * Orchestrator-Authenticated-XXE-Credential-Exposure.html</vuln:reference>
 * </vuln:references> <vuln:summary>McAfee ePolicy Orchestrator (ePO) before
 * 4.6.9 and 5.x before 5.1.2 uses the same secret key across different
 * customers' installations, which allows attackers to obtain the administrator
 * password by leveraging knowledge of the encrypted password.</vuln:summary>
 * </entry>
 */